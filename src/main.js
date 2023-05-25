import { Telegraf, session } from 'telegraf'
import { message } from 'telegraf/filters'
import { code } from 'telegraf/format'
import config from 'config'
import { ogg } from "./ogg.js";
import {openai} from "./openai.js";

const INITIAL_SESSION = { messages: [] };

const bot = new Telegraf(config.get("TELEGRAM_TOKEN"))

bot.use(session())

bot.command('new', async (ctx) => {
    ctx.session = INITIAL_SESSION;

    await ctx.reply('Жду вашего голосового или текстового сообщения')
})

bot.command('start', async (ctx) => {
    ctx.session = INITIAL_SESSION;

    await ctx.reply('Жду вашего голосового или текстового сообщения')
})

bot.on(message('voice'), async (ctx) => {
    ctx.session ??= INITIAL_SESSION
    try {
        await ctx.reply(code('Сообщение принял. Жду ответ от сервера'))

        const link = await ctx.telegram.getFileLink(ctx.message.voice.file_id);
        const userId = String(ctx.message.from.id);

        const oggPath = await ogg.create(link.href, userId)
        const mp3Path = await ogg.toMp3(oggPath, userId);

        const text = await openai.transcription(mp3Path)

        ctx.session.messages.push({ role: openai.roles.USER, content: text });

        const response = await openai.chat(ctx.session.messages)

        ctx.session.messages.push({ role: openai.roles.ASSISTANT, content: text });

        await ctx.reply(`Ваш запрос: ${text}`)
        await ctx.reply(response.content)
    } catch (err) {
        console.log(`Error while voice message ${err.message}`)
    }
})

bot.on(message('text'), async (ctx) => {
    ctx.session ??= INITIAL_SESSION
    try {
        await ctx.reply(code('Сообщение принял. Жду ответ от сервера'))

        // const link = await ctx.telegram.getFileLink(ctx.message.voice.file_id);
        // const userId = String(ctx.message.from.id);
        //
        // const oggPath = await ogg.create(link.href, userId)
        // const mp3Path = await ogg.toMp3(oggPath, userId);
        // const text = await openai.transcription()

        ctx.session.messages.push({
            role: openai.roles.USER,
            content: ctx.message.text
        });
        const response = await openai.chat(ctx.session.messages)

        ctx.session.messages.push({ role: openai.roles.ASSISTANT, content: ctx.message.text });

        await ctx.reply(`Ваш запрос: ${ctx.message.text}`)
        await ctx.reply(response.content)
    } catch (err) {
        console.log(`Error while voice message ${err.message}`)
    }

})

bot.command('start', async (ctx) => {
    await ctx.reply(JSON.stringify(ctx.message, null, 2))
})

bot.launch()

process.once('SIGNNT', () => bot.stop('SIGNINT'))
process.once('SIGTERM', () => bot.stop('SIGTERM'))