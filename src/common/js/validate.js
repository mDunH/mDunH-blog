const validateRule = {
    username: {
        rule: /^\S+$/,
        error: "用户名不能为空或含有非法字符！"
    },
    password: {
        rule: /^\S{6,15}$/,
        error: "密码长度必须大于6位小于15位！"
    },
    age: {
        rule: /^\d/,
        error: "年龄格式不正确！"
    },
    phone: {
        rule: /^1[3,5,7,8]\d{9}/,
        error: "请输入正确的手机号！"
    },
    postTitle: {
        rule: /^\S+$/,
        error: "标题不能为空或含有非法字符！"
    },
    postContent: {
        rule: /^(\S|\s)+$/,
        error: "内容不能为空！"
    }
}

export default function validate(param, cb) {
    const keys = Object.keys(param);
    for (let i = 0; i < keys.length; i++) {
        if (validateRule[keys[i]]) {
            if (!validateRule[keys[i]].rule.test(param[keys[i]])) {
                alert(validateRule[keys[i]].error);
                return;
            }
        } else {
            alert("No configuration of this validation");
            return;
        };
    };
    cb();
}