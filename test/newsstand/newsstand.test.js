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

    mocha.beforeEach(() => {
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

        let uniqueIds = []
        let ids = ['202020', '52352', '6344634', '734341', '467457', '26236523', '4579237421']
        ids.forEach((v) => uniqueIds.push({nsid: v}))
        let isLive = false;
        let editorId = "필성<psk@gmail.com>"
        let template = "top-single"
        let feedbackEmail = "psk@gmail.com;mybody@gmailcom" // max count 5

        let param = {
            editorId: editorId,
            template: template,
            uniqueIds: uniqueIds,
            feedbackEmail: feedbackEmail
        }

        if (isLive) {
            param.live = {
                show: false, // defulat
                position: "top" // top(default) or bottom
            };
        }

        expected = {
            editorId: `필성<${email}>`,
            template: 'top-single',
            headlineArticles: uniqueIds,
            feedbackEmail: `${email};${email}`
        }
        axios.post("http://localhost:8060/article/newsstand/json.do", param, {
            headers: {
                "Cookie": `JSESSIONID=6D3A8F26F0E4A658B6381C4CA1A9A784`
            },
            responseType: "json",
        })
        .then(res => {
            console.log(res);
            const actual = res.data;
            assert.strictEqual("Success", actual);
            done();
        })

    })
})