var BaseBot = require('bot-sdk');

class Bot extends BaseBot{
    constructor (postData) {
        super(postData);

        this.addLaunchHandler(()=>{
            return {
                outputSpeech : '欢迎使用12345690!'
            };
        });

        this.addIntentHandler('close_corp_video', ()=>{
            let card = new Bot.Card.TextCard('正在关闭，请稍后！！！')
            return {
                card : card,
                outputSpeech : '领导，正在关闭，请稍后！'
            };
        })

        this.addIntentHandler('open_corp_video', ()=>{
            let card = new Bot.Card.TextCard('马上打开！！！')
            return {
                card : card,
                outputSpeech : '领导，这就给你放视频！'
            };
        })

        this.addIntentHandler('personal_income_tax.inquiry', ()=>{
            let loc = this.getSlot('location');    
            let monthlySalary = this.getSlot('monthlysalary');

            if(!monthlySalary) {
                this.nlu.ask('monthlySalary');
                let card = new Bot.Card.TextCard('你工资多少呢');

                // 如果有异步操作，可以返回一个promise
                return new Promise(function(resolve, reject){
                    resolve({
                        card : card,
                        outputSpeech : '你工资多少呢'
                    });
                });
            }

            if(!loc) {
                let card = new Bot.Card.TextCard('你在哪呢');
                this.nlu.ask('location');
                return {
                    card : card,
                    outputSpeech : '你在哪呢'
                };

            }
        });
    }
}

module.exports = Bot;
