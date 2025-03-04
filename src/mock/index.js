import Mock from 'mockjs';

export function setupProdMockServer() {
    // 生产环境 Mock 配置（可选）
}

export default [
    {
        url: '/api/users', // 模拟的接口路径
        method: 'get', // 请求方法
        response: () => {
            return Mock.mock({
                code: 0,
                message: 'success',
                data: {
                    'list|10': [
                        {
                            id: '@id',
                            name: '@cname',
                            email: '@email',
                            age: '@integer(18, 60)',
                        },
                    ],
                },
            });
        },
    },
    {
        url: '/api/login', // 模拟登录接口
        method: 'post',
        response: (options) => {
            const { body } = options;
            if (body.username === 'admin' && body.password === '123456') {
                return {
                    code: 0,
                    message: '登录成功',
                    data: {
                        token: 'mock-token-123',
                        roles: ['admin'],
                    },
                };
            }
            return {
                code: -1,
                message: '用户名或密码错误',
                data: null,
            };
        },
    },
];