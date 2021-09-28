const axios = require('axios');

const spyAxiosGet = jest.spyOn(axios, "get");
const spyAxiosPost = jest.spyOn(axios, "post");
const spyAxiosPatch = jest.spyOn(axios, "patch");

beforeEach(() => {
    axios.get.mockClear();
    axios.post.mockClear();
    axios.patch.mockClear();
});

const info = {
    userId: 1,
    orderId: 4,
    receiverId: 4,
    productId: 1,
    productCode: 702,
    endPoint: "http://localhost:4242",
    case: [
       '[송신자]',
       '[수신자]'
    ],
    num: 0,
    preference: {
        "gender": 1,
        "age": 1,
        "price": 1,
    },
};

test(`${info.case[0]} ${++info.num}. ${info.userId}번 user 조회 테스트입니다.`, async () => {
    const url = `${info.endPoint}/users/${info.userId}`;
    const axiosResult = await spyAxiosGet(url);
    const axiosData = axiosResult.data;
    console.log(`${info.userId}번 유저 조회 결과:`, axiosData);

    expect(spyAxiosGet).toBeCalledTimes(1);
    expect(spyAxiosGet).toBeCalledWith(url);
    expect(axiosData).toHaveProperty("success", true);
    expect(axiosData.data).toHaveProperty("id", info.userId);
});

test(`${info.case[0]} ${++info.num}. 주문을 위한 preference에 따른 상품 조회 테스트입니다.`, async () => {
    const option = info.preference;
    const url = `${info.endPoint}/products?gender=${option.gender}&age=${option.age}&price=${option.price}`;
    const axiosResult = await spyAxiosGet(url);
    const axiosData = axiosResult.data;
    console.log('preference에 따른 상품들 조회 결과:', axiosData);

    expect(spyAxiosGet).toBeCalledTimes(1);
    expect(spyAxiosGet).toBeCalledWith(url);
    expect(axiosData).toHaveProperty("success", true);
});

test(`${info.case[0]} ${++info.num}. 주문 생성 테스트입니다.`, async () => {
    const userData = {
        "giver_name": "주는이",
        "giver_phone": "01012345678",
        "receiver_name": "받는이",
        "receiver_phone": "01056781234",
        "gender": info.preference.gender,
        "age": info.preference.age,
        "price": info.preference.price,
    }
    const url = `${info.endPoint}/users/${info.userId}/orders`;
    const axiosResult = await spyAxiosPost(url, userData);
    const orderDetail = axiosResult.data;

    expect(spyAxiosPost).toBeCalledTimes(1);
    expect(spyAxiosPost).toBeCalledWith(url, userData);
    expect(orderDetail).toHaveProperty("success", true);
});

test(`${info.case[0]} ${++info.num}. 주문 생성 확인 테스트입니다.`, async () => {
    const url = `${info.endPoint}/users/${info.userId}/orders/${info.orderId}`;
    const axiosResult = await spyAxiosGet(url);
    const orderDetail = axiosResult.data;
    console.log(`${info.orderId}번 주문 디테일 조회`, orderDetail);

    expect(spyAxiosGet).toBeCalledTimes(1);
    expect(spyAxiosGet).toBeCalledWith(url);
    expect(orderDetail).toHaveProperty("success", true);
})

test(`${info.case[1]} ${++info.num}. 특정 수신자 조회 테스트입니다.`, async () => {
    const url = `${info.endPoint}/receiver/${info.receiverId}`;
    const axiosResult = await spyAxiosGet(url);
    const receiverDetail = axiosResult.data;
    console.log(`${info.receiverId}번 수신자 디테일 조회`, receiverDetail);

    expect(spyAxiosGet).toBeCalledTimes(1);
    expect(spyAxiosGet).toBeCalledWith(url);
    expect(receiverDetail).toHaveProperty("success", true);
});

test(`${info.case[1]} ${++info.num}. ${info.receiverId}번 수신자 필터에 따른 선물 목록 조회 테스트입니다.`, async () => {
    const url = `${info.endPoint}/receiver/${info.receiverId}/choice`;
    const axiosResult = await spyAxiosGet(url);
    const choiceList = axiosResult.data;

    expect(spyAxiosGet).toBeCalledTimes(1);
    expect(spyAxiosGet).toBeCalledWith(url);
    expect(choiceList).toHaveProperty("success", true);
});

test(`${info.case[1]} ${++info.num}. ${info.receiverId}번 수신자 선물 선택 테스트입니다.`, async () => {
    const receiverInfo = {
        "product_id": info.productCode,
        "post_code": 12345,
        "address": "서울특별시",
        "address_detail": "대룡서초타워",
        "likes": [1, 2],
        "dislikes": [3]
    };
    const url = `${info.endPoint}/receiver/${info.receiverId}`;
    const axiosResult = await spyAxiosPatch(url, receiverInfo);
    const choiceResult = axiosResult.data;

    expect(spyAxiosPatch).toBeCalledTimes(1);
    expect(spyAxiosPatch).toBeCalledWith(url, receiverInfo);
    expect(choiceResult).toHaveProperty("success", true);
});


test(`${info.case[1]} ${++info.num}. 선택 상품 확인 테스트입니다.`, async () => {
    const url = `${info.endPoint}/products/${info.productCode}`;
    const axiosResult = await spyAxiosGet(url);
    const productDetail = axiosResult.data;
    console.log('선택된 상품 디테일 조회:', productDetail);

    expect(spyAxiosGet).toBeCalledTimes(1);
    expect(spyAxiosGet).toBeCalledWith(url);
    expect(productDetail).toHaveProperty("success", true);
});

test(`${info.case[1]} ${++info.num}. 연령대 범주 확인 테스트입니다.`, async () => {
    const url = `${info.endPoint}/ages`;
    const axiosResult = await spyAxiosGet(url);
    const ageList = axiosResult.data;

    expect(spyAxiosGet).toBeCalledTimes(1);
    expect(spyAxiosGet).toBeCalledWith(url);
    expect(ageList).toHaveProperty("success", true);
});

test(`${info.case[1]} ${++info.num}. 가격대 범주 확인 테스트입니다.`, async () => {
    const url = `${info.endPoint}/prices`;
    const axiosResult = await spyAxiosGet(url);
    const priceList = axiosResult.data;

    expect(spyAxiosGet).toBeCalledTimes(1);
    expect(spyAxiosGet).toBeCalledWith(url);
    expect(priceList).toHaveProperty("success", true);
});