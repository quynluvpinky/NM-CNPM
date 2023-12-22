-- Tạo bảng food
CREATE TABLE food (
    itemID char(4) PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    photo VARCHAR(255),
    price INT NOT NULL,
    quantity INT NOT NULL,
    description VARCHAR(512) NOT NULL
);

-- Tạo bảng product
CREATE TABLE product (
    itemID char(4) PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    photo VARCHAR(255),
    price INT NOT NULL,
    quantity INT NOT NULL,
    description VARCHAR(512) NOT NULL
);

-- Tạo bảng order
CREATE TABLE "order" (
    orderID SERIAL PRIMARY KEY,
    date DATE NOT NULL,
    clientName VARCHAR(255) NOT NULL,
    clientPhone VARCHAR(20) NOT NULL,
    order_status varchar(15) CHECK (order_status IN ('purchased', 'not purchased', 'deleted'))
);

-- Tạo bảng foodOrder
CREATE TABLE foodOrder (
    orderID INT REFERENCES "order"(orderID),
    itemID char(4) REFERENCES food(itemID),
    quantity INT NOT NULL,
    PRIMARY KEY (orderID, itemID)
);

-- Tạo bảng productOrder
CREATE TABLE productOrder (
    orderID INT REFERENCES "order"(orderID),
    itemID char(4) REFERENCES product(itemID),
    quantity INT NOT NULL,
    PRIMARY KEY (orderID, itemID)
);

-- Tạo bảng stockChange
CREATE TABLE stockChange (
    id SERIAL PRIMARY KEY,
    date DATE NOT NULL,
    itemID char(4) REFERENCES product(itemID),
    quantity INT NOT NULL
);

CREATE TABLE admin (
    "username" VARCHAR(255) PRIMARY KEY,
    password VARCHAR(255)
);

-- Insert dữ liệu mẫu
INSERT INTO food (itemID, name, photo, price, quantity,description) VALUES
    ('MA01', 'Thịt kho trứng', 'https://drive.google.com/uc?export=view&id=1PlKdlZy2Nn8RFboUgdLEFhJ47SiEXHx2', 25000, 20,'Món thịt kho trứng thơm ngon và hấp dẫn, với sự hòa quyện của thịt thăn mềm mại và lòng trắng trứng gà béo ngậy. Nước sốt đặc biệt được nấu chín từ nước mắm, đường, và gia vị tạo nên hương vị truyền thống, đậm đà của ẩm thực Việt Nam.'),
    ('MA02', 'Tôm rim hành tỏi', 'https://drive.google.com/uc?export=view&id=1pYJgbRMQEOBFWcuRcQg_DQMLCHc2CiwN', 25000, 20,'Tôm rim hành tỏi là món biểu tượng của sự hòa quyện giữa vị ngọt của tôm, hương thơm của tỏi, và sự cay nồng nhẹ từ hành. Tôm được rim mềm, đậm đà vị ngon, tạo nên một món ăn hấp dẫn, lôi cuốn với hương vị đặc trưng.'),
    ('MA03', 'Thịt kho cải chua', 'https://drive.google.com/uc?export=view&id=1pp7_0lFUIZ-jQG4iPaBtRCkilCGEctF8', 25000, 20,'Món thịt kho cải chua kết hợp giữa sự ngon miệng của thịt bò thăn và vị chua dịu của cải chua. Nước sốt thấm đều, mang lại hương vị đặc trưng và sự hài hòa độc đáo, là lựa chọn tuyệt vời cho những người yêu thích hương vị truyền thống.'),
    ('MA04', 'Bò xào bắp non', 'https://drive.google.com/uc?export=view&id=1_5zJypb7AStQZ_NqG0c8wtOQumjXPtFG', 25000, 20,'Món bò xào bắp non là sự kết hợp tuyệt vời giữa sự giòn ngon của bắp non và độ ngon của thịt bò. Được xào nhanh chóng với rau sống, món ăn này không chỉ ngon miệng mà còn bổ dưỡng, phù hợp cho mọi bữa ăn.'),
    ('MA05', 'Óc móng tay xào rau muống', 'https://drive.google.com/uc?export=view&id=1Am3Suxy25nr8fvzJ0LF79KIDt3G0Ca4k', 25000, 20,'Óc móng tay xào rau muống là một món biểu tượng của hải sản hấp dẫn kết hợp với hương vị tươi ngon của rau muống xanh. Mỗi miếng óc móng tay giữ lại hương thơm độc đáo, tạo nên một trải nghiệm ẩm thực đặc sắc.'),
    ('MA06', 'Tim bò xào hành cần', 'https://drive.google.com/uc?export=view&id=1Ox9rfqO8IIfzrLenNnBvcjsvENhA1wFC', 25000, 20,'Món tim bò xào hành cần là sự kết hợp tuyệt vời giữa sự mềm mại của tim bò và hương vị đặc trưng của hành cần. Món ăn này không chỉ ngon miệng mà còn giàu chất dinh dưỡng, là lựa chọn lý tưởng cho bữa ăn hằng ngày.'),
    ('MA07', 'Thịt kho tam củ', 'https://drive.google.com/uc?export=view&id=1Po0TVWW-Rr1wZ1TDJIX5XS4hivsOYHTM', 25000, 20,'Thịt kho tam củ là một sự pha trộn ngon miệng của thịt thăn, củ hành, củ cà rốt và củ khoai lang. Nước sốt thấm đều vào từng miếng thịt, tạo nên hương vị độc đáo và đầy ấn tượng.'),
    ('MA08', 'Sườn non chua ngọt', 'https://drive.google.com/uc?export=view&id=1Fxx6XqfXFk05UDUMAX2SMrfoPxIzqmBL', 25000, 20,'Món sườn non chua ngọt có lớp vỏ giòn và thịt sườn non mềm ngon. Nước sốt chua ngọt cân đối, tạo nên một món ăn hấp dẫn, phù hợp cho cả những bữa tiệc gia đình hay cuộc gặp gỡ bạn bè.'),
    ('MA09', 'Gà kho rau răm', 'https://drive.google.com/uc?export=view&id=1NAVR6BmiAFB1fptzyibYTWhN9ZTGypBA', 25000, 20,'Gà kho rau răm là sự kết hợp tuyệt vời giữa vị ngon của thịt gà và hương thơm của rau răm. Nước sốt đậm đà, thấm đều vào từng phần của gà, tạo nên một món ăn độc đáo và thơm ngon.');

INSERT INTO product (itemID, name, photo, price, quantity,description) VALUES
    ('SP01', 'Sting', 'https://drive.google.com/uc?export=view&id=1GZUfRgHjIFL5KjhfZTEhQPfzMgB6cz5Q', 10000, 20,'Sting là nước đóng chai mang lại cảm giác sảng khoái và năng động. Hương vị ngọt ngào, hòa quyện với sự tươi mát từ ga và các thành phần tự nhiên khác, Sting là sự lựa chọn hoàn hảo cho những người muốn tận hưởng một ngày mới tràn đầy năng lượng.'),
    ('SP02', 'Lavie', 'https://drive.google.com/uc?export=view&id=1dpysviPliDDEPmuYWRdJ58bOfO1rurMi',6000, 20,'Lavie là một loại nước khoáng tinh khiết, đến từ những nguồn nước nguyên sơ. Với hương vị mát lạnh và sự trong lành, Lavie giúp làm giảm căng thẳng và mang lại cảm giác sảng khoái sau những giờ làm việc căng thẳng.'),
    ('SP03', 'Aquafina', 'https://drive.google.com/uc?export=view&id=1Qn0G_t_pBXtNoqU8bHasZ3Ol0Ofs7CkS', 6000, 20,'Aquafina là một loại nước khoáng tinh khiết, đến từ những nguồn nước nguyên sơ. Với hương vị mát lạnh và sự trong lành, Lavie giúp làm giảm căng thẳng và mang lại cảm giác sảng khoái sau những giờ làm việc căng thẳng.'),
    ('SP04', 'Trà xanh không độ', 'https://drive.google.com/uc?export=view&id=1SopyaZ40Z36GywNK0TS4ChD9K03oK3rD', 10000, 20,'Trà xanh không độ là sự kết hợp hoàn hảo giữa hương vị tinh tế của trà xanh và sự tươi mát từ lớp đá. Không có đường, đây là lựa chọn lý tưởng cho những người muốn thưởng thức trà xanh mà không cảm nhận vị ngọt.'),
    ('SP05', 'Bánh mì chà bông Staff', 'https://drive.google.com/uc?export=view&id=1Qv60r-HXDx6VPE717eAbdZl5weFZQBUR', 8000, 20,'Bánh mì chà bông Staff là sự kết hợp hoàn hảo giữa lớp vỏ giòn tan và chà bông thơm ngon. Với hình dáng hấp dẫn và hương vị độc đáo, bánh mì này là sự lựa chọn tuyệt vời cho những bữa sáng nhanh chóng và ngon miệng.'),
    ('SP06', 'Bánh mì Otto', 'https://drive.google.com/uc?export=view&id=1g8tfXDyznPccbU50s4ippMT98Ou6XLAq', 8000, 20,'Bánh mì Otto là một sự hoàn hảo giữa lớp vỏ giòn và nhân bánh mì mềm mại. Hương vị đặc trưng và hấp dẫn, bánh mì này làm hài lòng cả những người thưởng thức bánh mì khó tính nhất.'),
    ('SP07', 'Gold Daisy bánh kem xốp sữa', 'https://drive.google.com/uc?export=view&id=1ZRp2Sg1p5szmYG-pjttHxIghhayGwpiu' ,25000, 20,'Gold Daisy bánh kem xốp sữa là một tuyệt tác của ngọt ngào và hòa quyện. Lớp kem mềm mại bao phủ bánh xốp sữa tạo nên một trải nghiệm thưởng thức bánh kem độc đáo và thú vị.'),
    ('SP08', 'Khoai tây chiên slide', 'https://drive.google.com/uc?export=view&id=1QDUitnps7pNEzk0LVHq5--P9UJldkI_q', 26000, 20,'Khoai tây chiên slide là sự lựa chọn lý tưởng cho những người yêu thích khoai tây chiên giòn. Dạng slide nhỏ giúp dễ dàng ăn và thưởng thức, là món ăn nhẹ hoàn hảo cho mọi dịp.'),
    ('SP09', 'Milo', 'https://drive.google.com/uc?export=view&id=1NOat7pJHEnQO9RxA3OrwrkJ8vVsXHp4K', 6000, 20,'Milo là đồ uống cacao sô cô la giàu dinh dưỡng, mang lại năng lượng cho cả ngày. Với hương vị thơm ngon, Milo là sự kết hợp hoàn hảo giữa sô cô la và sữa, làm hài lòng cả những người thưởng thức đồ uống cacao tinh tế.'),
    ('SP10', 'Vinamilk', 'https://drive.google.com/uc?export=view&id=1Hvej_IZUzgTOwXsspBD56CcYMbj1QNor', 7000, 20,'Vinamilk là sữa tươi ngon và bổ dưỡng, được sản xuất từ nguồn nguyên liệu chất lượng cao. Với hương vị tinh tế và dinh dưỡng đầy đủ, Vinamilk là sự lựa chọn yêu thích của nhiều người.');

INSERT INTO "order" (date, clientName, clientPhone, order_status) VALUES
    ('2023-12-20', 'Nguyen Van A', '0123456789', 'purchased'),
    ('2023-12-21', 'Tran Thi B', '0987654321', 'not purchased');

INSERT INTO foodOrder (orderID, itemID, quantity) VALUES
    (1, 'MA01', 2),
    (2, 'MA02', 1);

INSERT INTO productOrder (orderID, itemID, quantity) VALUES
    (1, 'SP01', 1),
    (2, 'SP02', 3);

INSERT INTO stockChange (date, itemID, quantity) VALUES
    ('2023-12-20', 'SP01', -2),
    ('2023-12-21', 'SP02', 3);

INSERT INTO admin (username,password) VALUES
    ('admin', '123456');