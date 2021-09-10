module.exports = async function (userModel) {
    try {
        const userData = userModel.dataValues;
        const userDetail = {
            id: userData.id,
            nickname: userData.name,
            email: userData.email,
        }
        return userDetail;
    } catch (err) {
        console.error('유저 디테일 생성 오류:', err);
    }
}