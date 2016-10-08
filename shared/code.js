module.exports = {
    OK:                                 {code:200},
    FAIL:                               {code:500},
    HAVE_NEW_VERSION:                   {code:100001, msg:"有新版本"},
    FORCE_UPDATE:                       {code:100002, msg:"强制更新"},
    registerUserExist:					{code:100011, msg:"用户已存在"},
    loginUserOrPassworadError:			{code:100012, msg:"用户名或密码错误"},
    noUserAtTheServer:					{code:100013, msg:"本服没有该用户"},
    theServerUserHaved:					{code:100014, msg:"本服已有账号"},
    nicknameExist:						{code:100015, msg:"昵称已存在"},
    databaseError:						{code:200001, msg:"服务器数据库错误"},

	GATE: {
		FA_NO_SERVER_AVAILABLE: 1001
	},
    ENTRY: {
        FA_TOKEN_INVALID: 	2001,
        FA_TOKEN_EXPIRE: 	2002,
        FA_USER_NOT_EXIST: 	2003
    }
};
