exports.getList = (req, res, next)=>{
    let accounts =[
        {
            full_name: 'Nguyen Tien Dung',
            username: 'Suhdo',
            email: 'dungvipnr@gmailcom',
            password: '243203',
            role: 'admin',
            status: 'active'
        },
        {
            full_name: 'Nguyen Tien Dung',
            username: 'Suhdo',
            email: 'dungvipnr@gmailcom',
            password: '243203',
            role: 'admin',
            status: 'active'
        },
        {
            full_name: 'Nguyen Van A',
            username: 'VanA',
            email: 'dungvipnr@gmailcom',
            password: '243203',
            role: 'user',
            status: 'unactive'
        },
        {
            full_name: 'Nguyen Tien Dung',
            username: 'Suhdo',
            email: 'dungvipnr@gmailcom',
            password: '243203',
            role: 'admin',
            status: 'unactive'
        },
        {
            full_name: 'Nguyen Tien Dung',
            username: 'Suhdo',
            email: 'dungvipnr@gmailcom',
            password: '243203',
            role: 'user',
            status: 'active'
        },
        {
            full_name: 'Nguyen Tien Dung',
            username: 'Suhdo',
            email: 'dungvipnr@gmailcom',
            password: '243203',
            role: 'user',
            status: 'active'
        },
    ]
    res.render('accounts/list', {title: 'Accounts', accounts});
}