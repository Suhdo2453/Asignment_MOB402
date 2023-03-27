exports.getList= (req, res, next)=> {
    // Dữ liệu mẫu
    let data = [
        {
            image: 'https://via.placeholder.com/150x150',
            name: 'Sản phẩm 1',
            category: 'Loại 1',
            description: 'Nội dung mô tả sản phẩm 1',
            price: '100,000 đ'
        },
        {
            image: 'https://via.placeholder.com/150x150',
            name: 'Sản phẩm 2',
            category: 'Loại 2',
            description: 'Nội dung mô tả sản phẩm 2',
            price: '200,000 đ'
        },
        {
            image: 'https://via.placeholder.com/150x150',
            name: 'Sản phẩm 1',
            category: 'Loại 1',
            description: 'Nội dung mô tả sản phẩm 1',
            price: '100,000 đ'
        },
        {
            image: 'https://via.placeholder.com/150x150',
            name: 'Sản phẩm 2',
            category: 'Loại 2',
            description: 'Nội dung mô tả sản phẩm 2',
            price: '200,000 đ'
        },
        {
            image: 'https://via.placeholder.com/150x150',
            name: 'Sản phẩm 1',
            category: 'Loại 1',
            description: 'Nội dung mô tả sản phẩm 1',
            price: '100,000 đ'
        },
        {
            image: 'https://via.placeholder.com/150x150',
            name: 'Sản phẩm 2',
            category: 'Loại 2',
            description: 'Nội dung mô tả sản phẩm 2',
            price: '200,000 đ'
        },
        {
            image: 'https://via.placeholder.com/150x150',
            name: 'Sản phẩm 1',
            category: 'Loại 1',
            description: 'Nội dung mô tả sản phẩm 1',
            price: '100,000 đ'
        },
        {
            image: 'https://via.placeholder.com/150x150',
            name: 'Sản phẩm 2',
            category: 'Loại 2',
            description: 'Nội dung mô tả sản phẩm 2',
            price: '200,000 đ'
        },
        {
            image: 'https://via.placeholder.com/150x150',
            name: 'Sản phẩm 1',
            category: 'Loại 1',
            description: 'Nội dung mô tả sản phẩm 1',
            price: '100,000 đ'
        },
        {
            image: 'https://via.placeholder.com/150x150',
            name: 'Sản phẩm 2',
            category: 'Loại 2',
            description: 'Nội dung mô tả sản phẩm 2',
            price: '200,000 đ'
        },
        {
            image: 'https://via.placeholder.com/150x150',
            name: 'Sản phẩm 1',
            category: 'Loại 1',
            description: 'Nội dung mô tả sản phẩm 1',
            price: '100,000 đ'
        },
        {
            image: 'https://via.placeholder.com/150x150',
            name: 'Sản phẩm 2',
            category: 'Loại 2',
            description: 'Nội dung mô tả sản phẩm 2',
            price: '200,000 đ'
        }
    ];
    res.render('products/list', {data});
}