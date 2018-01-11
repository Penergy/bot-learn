var BaseBot = require('bot-sdk');
var http = require('http');

class Bot extends BaseBot {
    constructor(postData) {
        super(postData);

        this.addLaunchHandler(() => {
            http.get({
                hostname: '10.1.3.5',
                port: 5000,
                path: '/',
                agent: false  // 创建一个新的代理，只用于本次请求
            }, (res) => {
                // 对响应进行处理
            });
            
            return {
                outputSpeech: '欢迎使用12345690!'
            };
        });

        this.addIntentHandler('close_corp_video', () => {
            let card = new Bot.Card.TextCard('正在关闭，请稍后！！！')
            http.get({
                hostname: '10.1.3.5',
                port: 5000,
                path: '/',
                agent: false  // 创建一个新的代理，只用于本次请求
            }, (res) => {
                // 对响应进行处理
            });
            return {
                card: card,
                outputSpeech: '领导，正在关闭，请稍后！'
            };
        })

        this.addIntentHandler('open_corp_video', () => {
            let card = new Bot.Card.TextCard('马上打开！！！')
            return {
                card: card,
                outputSpeech: '领导，这就给你放视频！'
            };
        })

        this.addIntentHandler('increase_voice', () => {
            let card = new Bot.Card.TextCard('太轻了，对吧。我就知道！！！')
            return {
                card: card,
                outputSpeech: '太轻了，对吧。我就知道！'
            };
        })


        this.addIntentHandler('personal_income_tax.inquiry', () => {
            let loc = this.getSlot('location');
            let monthlySalary = this.getSlot('monthlysalary');

            if (!monthlySalary) {
                this.nlu.ask('monthlySalary');
                let card = new Bot.Card.TextCard('你工资多少呢');

                // 如果有异步操作，可以返回一个promise
                return new Promise(function (resolve, reject) {
                    resolve({
                        card: card,
                        outputSpeech: '你工资多少呢'
                    });
                });
            }

            if (!loc) {
                let card = new Bot.Card.TextCard('你在哪呢');
                this.nlu.ask('location');
                return {
                    card: card,
                    outputSpeech: '你在哪呢'
                };

            }
        });
    }
}

module.exports = Bot;
