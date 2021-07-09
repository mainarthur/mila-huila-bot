const logger = require('../../logger')
const bot = require('../../bots/bot')

const { PIZDA, PEREHOCHESH, LECHIT } = require('../../../config.json')

const da = buildRegexp('да')
const mila = buildRegexp('мила')
const hochu = buildRegexp('хочу')

/**
 *  @param {import('bull').Job<import("node-telegram-bot-api").Message>}  job
 */
const messageJobProcessor = async ({ data: message }) => {
  try {
    const {
      caption,
      text,
      message_id,
      chat: { id },
    } = message
    const options = {
      reply_to_message_id: message_id,
    }

    const textToCheck = text ?? caption

    if (textToCheck.match(da)) {
      return bot.sendSticker(id, PIZDA, options)
    }
    if (textToCheck.match(mila)) {
      return bot.sendMessage(id, 'хуила', options)
    }
    if (textToCheck.toLowerCase().startsWith('узнали')) {
      return bot.sendMessage(id, 'Согласны?', options)
    }
    if (textToCheck.toLowerCase().startsWith('нет')) {
      return bot.sendMessage(id, 'Пидора ответ', options)
    }
    if (textToCheck.toLowerCase().startsWith('больше жира')) {
      return bot.sendMessage(id, 'МЕНЬШЕ СТРЕССА', options)
    }
    if (textToCheck.match(hochu)) {
      return bot.sendSticker(id, PEREHOCHESH, options)
    }
    if (
      textToCheck.toLowerCase().includes('мне плохо') ||
      textToCheck.toLowerCase().includes('мне хуево') ||
      textToCheck.toLowerCase().includes('мне хуёво') ||
      textToCheck.toLowerCase().includes('мне грустно') ||
      textToCheck.toLowerCase().includes('мне хорошо') ||
      textToCheck.toLowerCase().includes('мне нехорошо')
    ) {
      return bot.sendSticker(id, LECHIT, options)
    }
  } catch (err) {
    logger.err(err)
  }
}

module.exports = messageJobProcessor

/**
 *
 * @param {string} word
 * @returns
 */
function buildRegexp(word) {
  return new RegExp(
    `[^а-яё]${word}[^а-яё]|\\s${word}|${word}\\s|\\s${word}\\s|^${word}$`,
    'i',
  )
}
