const axios = require('axios');
const {Order} = require('../../models');
const setResponseForm = require('../../libs/setResponseForm');

async function getTokenFromIMP() {
    const axiosResult = await axios({
        url: "https://api.iamport.kr/users/getToken",
        method: "post",
        headers: {"Content_Type": "application/json"},
        data: {
            imp_key: process.env.IMP_KEY,
            imp_secret: process.env.IMP_SECRET,
        }
    });
    const {access_token} = axiosResult.data.response;
    return access_token;
}

async function getPaymentData (imp_uid, accessToken) {
    const axiosResult = await axios({
        url:`https://api.iamport.kr/payments/${imp_uid}`,
        method: "get",
        headers: {"Authorization": accessToken}
    });
    return axiosResult.data.response;
}

exports.checkPayment = async function (req, res, next) {
    try {
        const {imp_uid, merchant_uid} = req.body;

        // 1. IMP 서버로부터 액세스 토큰 발급 받기
        const accessToken = await getTokenFromIMP();

        // 2. access token을 이용한 결제 관련 정보 조회
        const paymentData = await getPaymentData(imp_uid, accessToken);

        // 3. DB에서 결제 되어야 하는 금액 조회
        const order = await Order.findOne({
            where: {merchantUid: merchant_uid},
        })
        const amountToBePaid = order.purchaseAmount;

        const {amount, status} = paymentData;
        if (amount === amountToBePaid) {
            // 관련 정보 DB에 저장
            if (status === "ready") {
                const {vbank_num, vbank_date, vbank_name} = paymentData;

                const msg = '가상 계좌 발급을 성공했습니다.';
                const ret = setResponseForm(true, {}, msg);
                res.json(ret);
                // res.send({status: "vbankIssued", message: "가상계좌 발급 성공"});
            } else if (status === "paid") {
                order.impUid = imp_uid;
                order.updatedAt = new Date().toISOString().replace(/T/, ' ').replace(/\..+/, '');
                order.paymentStatus = "결제완료";
                await order.save({fields:['impUid', 'updatedAt', 'paymentStatus']});

                const msg = '일반 결제를 성공했습니다.';
                const ret = setResponseForm(true, {}, msg);
                res.json(ret);
                // res.send({status: "success", message: "일반 결제 성공"});
            }
        } else {
            const msg = '위조된 결제를 시도했습니다.';
            const ret = setResponseForm(false, {}, msg);
            res.json(ret);
            // throw {status: "forgery", message: "위조된 결제시도"};
        }
    } catch (err) {
        console.error("결제 실패:", err);
        res.status(400).send(err);
    }
}