# Voice and Text AI Assistant in Telegram 

This project consists of several JavaScript files that work together to create a Telegram bot with voice and text message processing capabilities. The bot utilizes the Telegraf library for Telegram bot development and the OpenAI API for natural language processing tasks.

## Telegram Voice and Text Bot

This repository contains the code for a Telegram bot that can process voice and text messages. The bot is built using JavaScript and utilizes the Telegraf library for Telegram bot development and the OpenAI API for natural language processing tasks.

## Features

- Receives voice and text messages from users on Telegram
- Converts voice messages to Ogg and MP3 formats
- Performs audio transcription using the OpenAI API
- Processes text messages using the OpenAI API for generating responses
- Provides a seamless conversational experience with users

## Files

- `main.js`: Contains the main code for the Telegram bot, including command and message event handlers.
- `ogg.js`: Provides a helper class for converting audio files to Ogg and MP3 formats.
- `openai.js`: Implements a helper class for interacting with the OpenAI API for chat-based language processing and audio transcription.

## Usage

1. Install the required dependencies by running `npm install`.
2. Set the necessary configuration values, such as the Telegram bot token and OpenAI API key.
3. Run the bot using `node main.js`.
4. Start the bot in your Telegram chat and interact with it by sending voice or text messages.

Feel free to modify the code and add additional functionality to customize the bot according to your requirements.

Please note that you need appropriate permissions and access to the Telegram Bot API and the OpenAI API to use this bot.

Enjoy using the Telegram Voice and Text Bot!