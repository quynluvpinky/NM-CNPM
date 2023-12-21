-- Tạo bảng food
CREATE TABLE food (
    itemID char(4) PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    photo VARCHAR(255),
    price INT NOT NULL,
    quantity INT NOT NULL
);

-- Tạo bảng product
CREATE TABLE product (
    itemID char(4) PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    photo VARCHAR(255),
    price INT NOT NULL,
    quantity INT NOT NULL
);

-- Tạo bảng order
CREATE TABLE "order" (
    orderID SERIAL PRIMARY KEY,
    date DATE NOT NULL,
    clientName VARCHAR(255) NOT NULL,
    clientPhone VARCHAR(20) NOT NULL,
    isPurchased BOOLEAN
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
INSERT INTO food (itemID, name, photo, price, quantity) VALUES
    ('MA01', 'Thịt kho trứng', 'https://drive.google.com/uc?export=view&id=1PlKdlZy2Nn8RFboUgdLEFhJ47SiEXHx2', 25000, 20),
    ('MA02', 'Tôm rim hành tỏi', 'https://drive.google.com/uc?export=view&id=1pYJgbRMQEOBFWcuRcQg_DQMLCHc2CiwN', 25000, 20),
    ('MA03', 'Thịt kho cải chua', 'https://drive.google.com/uc?export=view&id=1pp7_0lFUIZ-jQG4iPaBtRCkilCGEctF8', 25000, 20),
    ('MA04', 'Bò xào bắp non', 'https://drive.google.com/uc?export=view&id=1_5zJypb7AStQZ_NqG0c8wtOQumjXPtFG', 25000, 20),
    ('MA05', 'Óc móng tay xào rau muống', 'https://drive.google.com/uc?export=view&id=1Am3Suxy25nr8fvzJ0LF79KIDt3G0Ca4k', 25000, 20),
    ('MA06', 'Tim bò xào hành cần', 'https://drive.google.com/uc?export=view&id=1Ox9rfqO8IIfzrLenNnBvcjsvENhA1wFC', 25000, 20),
    ('MA07', 'Thịt kho tam củ', 'https://drive.google.com/uc?export=view&id=1Po0TVWW-Rr1wZ1TDJIX5XS4hivsOYHTM', 25000, 20),
    ('MA08', 'Sườn non chua ngọt', 'https://drive.google.com/uc?export=view&id=1Fxx6XqfXFk05UDUMAX2SMrfoPxIzqmBL', 25000, 20),
    ('MA09', 'Gà kho rau răm', 'https://drive.google.com/uc?export=view&id=1NAVR6BmiAFB1fptzyibYTWhN9ZTGypBA', 25000, 20);

INSERT INTO product (itemID, name, photo, price, quantity) VALUES
    ('SP01', 'Sting', 'https://drive.google.com/uc?export=view&id=1GZUfRgHjIFL5KjhfZTEhQPfzMgB6cz5Q', 10000, 20),
    ('SP02', 'Lavie', 'https://drive.google.com/uc?export=view&id=1dpysviPliDDEPmuYWRdJ58bOfO1rurMi',6000, 20),
    ('SP03', 'Aquafina', 'https://drive.google.com/uc?export=view&id=1Qn0G_t_pBXtNoqU8bHasZ3Ol0Ofs7CkS', 6000, 20),
    ('SP04', 'Trà xanh không độ', 'https://drive.google.com/uc?export=view&id=1SopyaZ40Z36GywNK0TS4ChD9K03oK3rD', 10000, 20),
    ('SP05', 'Bánh mì chà bông Staff', 'https://drive.google.com/uc?export=view&id=1Qv60r-HXDx6VPE717eAbdZl5weFZQBUR', 8000, 20),
    ('SP06', 'Bánh mì Otto', 'https://drive.google.com/uc?export=view&id=1g8tfXDyznPccbU50s4ippMT98Ou6XLAq', 8000, 20),
    ('SP07', 'Gold Daisy bánh kem xốp sữa', 'https://drive.google.com/uc?export=view&id=1ZRp2Sg1p5szmYG-pjttHxIghhayGwpiu' ,25000, 20),
    ('SP08', 'Khoai tây chiên slide', 'https://drive.google.com/uc?export=view&id=1QDUitnps7pNEzk0LVHq5--P9UJldkI_q', 26000, 20),
    ('SP09', 'Milo', 'https://drive.google.com/uc?export=view&id=1NOat7pJHEnQO9RxA3OrwrkJ8vVsXHp4K', 6000, 20),
    ('SP10', 'Vinamilk', 'https://drive.google.com/uc?export=view&id=1Hvej_IZUzgTOwXsspBD56CcYMbj1QNor', 7000, 20);

INSERT INTO "order" (date, clientName, clientPhone, isPurchased) VALUES
    ('2023-12-20', 'Nguyen Van A', '0123456789', TRUE),
    ('2023-12-21', 'Tran Thi B', '0987654321', FALSE);

INSERT INTO foodOrder (orderID, itemID, quantity) VALUES
    (1, 'MA01', 2),
    (2, 'MA02', 1);

INSERT INTO productOrder (orderID, itemID, quantity) VALUES
    (1, 'SP01', 1),
    (2, 'SP02', 3);

INSERT INTO productOrder (orderID, itemID, quantity) VALUES
    (1, 'SP01', 1),
    (2, 'SP02', 3);

INSERT INTO stockChange (date, itemID, quantity) VALUES
    ('2023-12-20', 'SP01', -2),
    ('2023-12-21', 'SP02', 3);

INSERT INTO admin (username,password) VALUES
    ('admin', '123456');
