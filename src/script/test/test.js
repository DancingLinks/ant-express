var co = require('co')
const util = require('util')
var WechatAPI = require('wechat-api')
var config = require('../../config/wechat')
var api = new WechatAPI(config.appid, config.appsecret)

// co(function*() {
//   var res0 = yield* api.uploadThumbMaterial('/Users/Yezersky/Pictures/test.jpg')
//   console.log('res0:', res0)
// }).catch((err)=> {
//   console.error('err:', err)
// })

// api.getIp(console.log);


/*
 api.uploadMaterial('/Users/Yezersky/Pictures/test.jpg', 'thumb', console.log);

 { media_id: '4_5D60EOxH9q3DLzdSMEpvcz389XxuxWXiIdNs918rA',
 url: 'http://mmbiz.qpic.cn/mmbiz_jpg/CT8AnQR0jLP8557yQEwfYu0jd7ibficF3XjI30YqX7kbLlPQWExMyAaAuS3icGFCBV94Qb7zw3sQpJe3a9ou6QWhQ/0?wx_fmt=jpeg' } { status: 200,
 statusCode: 200,
 headers:
 { connection: 'keep-alive',
 'content-type': 'text/plain',
 date: 'Tue, 22 Nov 2016 11:33:38 GMT',
 'content-length': '206' },
 size: 206,
 aborted: false,
 rt: 619,
 keepAliveSocket: false,
 data:
 { media_id: '4_5D60EOxH9q3DLzdSMEpvcz389XxuxWXiIdNs918rA',
 url: 'http://mmbiz.qpic.cn/mmbiz_jpg/CT8AnQR0jLP8557yQEwfYu0jd7ibficF3XjI30YqX7kbLlPQWExMyAaAuS3icGFCBV94Qb7zw3sQpJe3a9ou6QWhQ/0?wx_fmt=jpeg' },
 requestUrls: [ 'https://api.weixin.qq.com/cgi-bin/material/add_material?access_token=5NwAUKJMVTrd19vtPorfEj109amQohiWFIZkYeWpHDXL7DeCxuah-pGoow4FSqzu8vf420z3_7K54yFreSS2-NsQVGN9yJQkElYiSNfS2pAkzT6jdFx312vKRZ8JnZGQVYLdACAORE&type=thumb' ] }
 */

/*
 api.uploadNewsMaterial({
 "articles": [
 {
 "title": 'hello world',
 "thumb_media_id": '4_5D60EOxH9q3DLzdSMEpvcz389XxuxWXiIdNs918rA',
 "author": '苦逼码农',
 "digest": '苦逼码农正在写hello world',
 "show_cover_pic": 1,
 "content": 'hello world<br/><pre>cout<<"hello world"<<endl;</pre>',
 }
 ]
 }, console.log)

 { media_id: '4_5D60EOxH9q3DLzdSMEpnnpUxZgygojJ_ZhyP0df8Y' } { status: 200,
 statusCode: 200,
 headers:
 { connection: 'keep-alive',
 'content-type': 'text/plain',
 date: 'Tue, 22 Nov 2016 11:37:16 GMT',
 'content-length': '58' },
 size: 58,
 aborted: false,
 rt: 1178,
 keepAliveSocket: false,
 data: { media_id: '4_5D60EOxH9q3DLzdSMEpnnpUxZgygojJ_ZhyP0df8Y' },
 requestUrls: [ 'https://api.weixin.qq.com/cgi-bin/material/add_news?access_token=BNEMZBIDSbrkokf-Iz-HuMDUpvg731C8XTKpgzUMZxKFrddP7VZC-hjLdVmMXXMvaQy8ZkRCFB-wEM7uQymVQ2Eui3Z3YnUBhZOYSpQtpmC07NNpncSFwu4VUElfJBrNDRVhAHAZNR' ] }
 */



// api.getMaterials('news', 0, 20, (err, data)=> {
//   console.log(util.inspect(data, {showHidden: false, depth: null}))
// })

/*
 { item:
 [ { media_id: '4_5D60EOxH9q3DLzdSMEpnnpUxZgygojJ_ZhyP0df8Y',
 content:
 { news_item:
 [ { title: 'hello world',
 author: '苦逼码农',
 digest: '苦逼码农正在写hello world',
 content: 'hello world<br  /><pre>cout&lt;&lt;"hello world"&lt;&lt;endl;</pre>',
 content_source_url: '',
 thumb_media_id: '4_5D60EOxH9q3DLzdSMEpvcz389XxuxWXiIdNs918rA',
 show_cover_pic: 1,
 url: 'http://mp.weixin.qq.com/s?__biz=MzA4MjQzNzY3Mg==&mid=100000003&idx=1&sn=7b0d84e191787fa7787154f6abc1fdf0&chksm=1f84f24428f37b52d947b1d69f798353544ce49ff6d745aa9a43275abc0e739119f66b61f463#rd',
 thumb_url: 'http://mmbiz.qpic.cn/mmbiz_jpg/CT8AnQR0jLP8557yQEwfYu0jd7ibficF3XjI30YqX7kbLlPQWExMyAaAuS3icGFCBV94Qb7zw3sQpJe3a9ou6QWhQ/0?wx_fmt=jpeg' } ],
 create_time: 1479814636,
 update_time: 1479814636 },
 update_time: 1479814636 } ],
 total_count: 1,
 item_count: 1 }


 */

/*
 api.updateNewsMaterial({
 "media_id":'4_5D60EOxH9q3DLzdSMEpnnpUxZgygojJ_ZhyP0df8Y',
 "index":0,
 "articles": {
 "title": 'hello world',
 "thumb_media_id": '4_5D60EOxH9q3DLzdSMEpvcz389XxuxWXiIdNs918rA',
 "author": '苦逼码农',
 "digest": '苦逼码农正在写hello world',
 "show_cover_pic": 1,
 "content": 'hello world<br/><pre>cout<<"hello world"<<endl;</pre></br>JS Version<br/><pre>console.log("hello world");</pre>'
 }
 }, console.log);

 { errcode: 0, errmsg: 'ok' } { status: 200,
 statusCode: 200,
 headers:
 { connection: 'keep-alive',
 'content-type': 'text/plain',
 date: 'Tue, 22 Nov 2016 11:46:58 GMT',
 'content-length': '27' },
 size: 27,
 aborted: false,
 rt: 1171,
 keepAliveSocket: false,
 data: { errcode: 0, errmsg: 'ok' },
 requestUrls: [ 'https://api.weixin.qq.com/cgi-bin/material/update_news?access_token=jzslcmd439ZBP27P5FGAULnhN8VdCSCh2ZbqeCYIde2Rb0clZtXPwExGQ8xsUkouZAvQs0pAfQG1JpGwwTJ6-hj-4J4AXexvgcFDj88o0Ye4QC-imps8yS39uvRX0MeKXTRjADAKGE' ] }
 */

/*
 api.massSendNews('4_5D60EOxH9q3DLzdSMEpnnpUxZgygojJ_ZhyP0df8Y', ['oKES6t_ECCK8059ywm-vq-_iJljE', 'oKES6t-wZGWk5_0yTZfE_mWnIx5I'], console.log);

 { errcode: 0,
 errmsg: 'send job submission success',
 msg_id: 3147483649,
 msg_data_id: 2247483653 } { status: 200,
 statusCode: 200,
 headers:
 { connection: 'keep-alive',
 'content-type': 'application/json; encoding=utf-8',
 date: 'Tue, 22 Nov 2016 11:54:33 GMT',
 'content-length': '97' },
 size: 97,
 aborted: false,
 rt: 512,
 keepAliveSocket: false,
 data:
 { errcode: 0,
 errmsg: 'send job submission success',
 msg_id: 3147483649,
 msg_data_id: 2247483653 },
 requestUrls: [ 'https://api.weixin.qq.com/cgi-bin/message/mass/send?access_token=fZ6Kx5nLgZMLAcyiosqvJbbelVW4WZZSBwAnVzHQ8_tono5WID3KikqS1KgrVOKXGpHp5y7lvaKAgwTtGf68s7gTq3pZU0-4mzQf04kg9DlknAhGw8LE6GC1f9VGXjo2WMIjAGAEUQ' ] }
 */

api.updateNewsMaterial({
  "media_id":'4_5D60EOxH9q3DLzdSMEpnnpUxZgygojJ_ZhyP0df8Y',
  "index":0,
  "articles": {
    "title": 'hello world',
    "thumb_media_id": '4_5D60EOxH9q3DLzdSMEpvcz389XxuxWXiIdNs918rA',
    "author": '苦逼码农',
    "digest": '苦逼码农正在写hello world',
    "show_cover_pic": 1,
    "content": 'hello world<br/><pre>cout<<"hello world"<<endl;</pre></br>JS Version<br/><pre>console.log("hello world");</pre><br/>PY Version TODO<br/>'
  }
}, console.log);