const NewsModule = require("./newsModule");
const common = require("../default.test");
const assert = common.assert;
const mocha = common.mocha;
const describe = common.describe;
const it = common.it;

const axios = require("axios");


describe(`JSON 내보내기`, () => {
    let expected

    let param

    let sessionId

    const email = `PSK@gmailcom`

    const userInfo = {
        username: 'd_test07',
        password: '1234'
    }

    mocha.before(() => {
        const urls = ['aaa','bbb','ccc','ddd','eee','fff','ggg','hhh','iii','jjj','kkk']
        const subTitleListStr = ['qwer', 'asdf', 'zxcv', 'hgfd', 'trew', 'jtr', 'mry', 'rew']
        param = {
            "siteSeq": "siteSeq",
            "siteCd": "siteCd",
            "articleSeq": "articleSeq",
            "chkServer": "chkServer",
            "deployReason": "deployReason",
            "deployFileNm": "deployFileNm",
            "deployFileDir": "deployFileDir",
            "uniqueId": "uniqueId",
            "title": "title",
            "summary": "summary",
            "audioYn": 'Y',
            "targetLink": urls,
            "subTitleList": subTitleListStr
        }
    })

    it(`login get jsession id`, function (done) {
        axios.post("http://localhost:8060/loginProcessing.do", userInfo, {
            withCredentials: true
        })
        .then(res => {
            const cookie = String(res.headers["set-cookie"][0]);
            sessionId = cookie.substring(cookie.indexOf("=") + 1, cookie.indexOf(";"))
        })
        .finally(() => done())
    })


    it(`거기서 원하는 json 생성`, function (done) {
        this.timeout(2000); // default

        let arr = []
        let ids = ['202020', '52352', '6344634', '734341', '467457', '26236523']
        ids.forEach((v) => arr.push({nsid: v}))

        expected = {
            editorId: `필성<${email}>`,
            template: 'top-single',
            headlineArticles: arr,
            feedbackEmail: `${email};${email}`
        }

        axios.post("/article/newsstand/json.do", param, {
            headers: {
                "Cookie": `JSESSIONID=${sessionId}`
            },
            withCredentials: true
        })
        .then(res => {
            console.log(res);
            assert.strictEqual(expected.editorId, res.editorId)
            assert.strictEqual(expected.template, res.template)
            // assert.strictEqual(expected.headlineArticles, res.headlineArticles)
            assert.strictEqual(expected.feedbackEmail, res.feedbackEmail)
            done();
        })

    })
})