const {Gender, Age, Price} = require('../../models');

exports.renderAppMange = async function (req, res, next) {
    const genders = await Gender.findAll({raw: true});
    const ages = await Age.findAll({raw: true});
    const prices = await Price.findAll({raw: true});

    res.render('appManage', {
        data: {
            gender: genders,
            age: ages,
            price: prices,
        }
    });
}

exports.saveAppManageOption = async function (req, res, next) {
    try {
        const options = req.body.option;
        const genders = await Gender.findAll();
        const ages = await Age.findAll();
        const prices = await Price.findAll();
        options.forEach((option) => {
            if (option.type === '성별') {
                for (let idx = 0; idx < genders.length; ++idx) {
                    if (genders[idx].type == option.value) {
                        genders[idx].active = option.active;
                    }
                }
            } else if (option.type === '연령대') {
                for (let idx = 0; idx < ages.length; ++idx) {
                    if (ages[idx].range == option.value) {
                        ages[idx].active = option.active;
                    }
                }
            } else if (option.type === '가격대') {
                for (let idx = 0; idx < prices.length; ++idx) {
                    if (prices[idx].range == option.value) {
                        prices[idx].active = option.active;
                    }
                }
            }
        });
        for (let idx = 0; idx < genders.length; ++idx) {
            await genders[idx].save({ fields: ['active']});
        }
        for (let idx = 0; idx < ages.length; ++idx) {
            await ages[idx].save({ fields: ['active']});
        }
        for (let idx = 0; idx < prices.length; ++idx) {
            await prices[idx].save({ fields: ['active']});
        }
        res.render('appManage', {
            data: {
                gender: genders,
                age: ages,
                price: prices,
            }
        });
    } catch (err) {
        console.error('app 권한 설정 오류:', err);
        next(err);
    }
}
