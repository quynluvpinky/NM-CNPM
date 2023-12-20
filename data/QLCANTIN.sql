-- Xóa bảng nếu tồn tại
DROP TABLE IF EXISTS CHITIETPHANAN, SANPHAMXUATKHO, CHITIETNHAPKHO, SANPHAMTONKHO, LOAISANPHAM, NHACUNGUNG, DOANHTHU, MONAN, SODIENTHOAINCU, ORDERMONAN, TAIKHOANADMIN, CHITIETMUAHANG;

-- Tạo bảng MONAN 
CREATE TABLE MONAN (
    MAMON CHAR(4),
    TENMON TEXT,
    PHOTO VARCHAR(250),
    GIA INT,
    PRIMARY KEY (MAMON)
);

-- Tạo bảng DOANHTHU
CREATE TABLE DOANHTHU (
    NGAY DATE,
    TONGTIEN INT,
    PRIMARY KEY (NGAY)
);

-- Tạo bảng NHACUNGUNG
CREATE TABLE NHACUNGUNG (
    MANCU CHAR(4),
    TENNCU TEXT,
    DIACHI TEXT,
    PRIMARY KEY (MANCU)
);

-- Tạo bảng LOAISANPHAM
CREATE TABLE LOAISANPHAM (
    MALOAI CHAR(4),
    TENLOAI TEXT,
    PRIMARY KEY (MALOAI)
);

-- Tạo bảng SANPHAMTONKHO
CREATE TABLE SANPHAMTONKHO (
    MASANPHAM CHAR(4),
    TENSANPHAM TEXT,
    PHOTO VARCHAR(250),
    SOLUONG INT,
    GIACA FLOAT,
    LOAISANPHAM CHAR(4),
    PRIMARY KEY (MASANPHAM),
    FOREIGN KEY (LOAISANPHAM) REFERENCES LOAISANPHAM(MALOAI)
);

-- Tạo bảng CHITIETNHAPKHO
CREATE TABLE CHITIETNHAPKHO (
    MANCU CHAR(4),
    MASANPHAM CHAR(4),
    NGAYNHAP DATE,
    SOLUONG INT,
    PRIMARY KEY (MANCU, MASANPHAM),
    FOREIGN KEY (MANCU) REFERENCES NHACUNGUNG(MANCU),
    FOREIGN KEY (MASANPHAM) REFERENCES SANPHAMTONKHO(MASANPHAM)
);

-- Tạo bảng SANPHAMXUATKHO
CREATE TABLE SANPHAMXUATKHO (
    MASANPHAM CHAR(4),
    NGAY DATE,
    SOLUONGSANPHAM INT,
    PRIMARY KEY (MASANPHAM, NGAY),
    FOREIGN KEY (MASANPHAM) REFERENCES SANPHAMTONKHO(MASANPHAM)
);

-- Tạo bảng CHITIETMUAHANG
CREATE TABLE CHITIETMUAHANG (
    ID CHAR(4),
    MASANPHAM CHAR(4),
    NGAY DATE,
    SOLUONGSANPHAM INT,
    PRIMARY KEY (ID, MASANPHAM, NGAY),
    FOREIGN KEY (MASANPHAM) REFERENCES SANPHAMTONKHO(MASANPHAM),
    FOREIGN KEY (NGAY) REFERENCES DOANHTHU(NGAY)
);

-- Tạo bảng CHITIETPHANAN
CREATE TABLE CHITIETPHANAN (
    NGAY DATE,
    MAMON CHAR(4),
    SOLUONGMON INT, --Số lượng món ước lượng cho một ngày
    PRIMARY KEY (NGAY, MAMON),
    FOREIGN KEY (NGAY) REFERENCES DOANHTHU(NGAY),
    FOREIGN KEY (MAMON) REFERENCES MONAN(MAMON)
);

-- Tạo bảng ORDERMONAN
CREATE TABLE ORDERMONAN (
    ID CHAR(4),
    NGAY DATE,
    MAMON CHAR(4),
    SOLUONGMON INT, --Số lượng món được order trong 1 lần
    PRIMARY KEY (ID, NGAY, MAMON),
    FOREIGN KEY (NGAY, MAMON) REFERENCES CHITIETPHANAN(NGAY, MAMON)
);

-- Tạo bảng TAIKHOANADMIN
CREATE TABLE TAIKHOANADMIN (
    TAIKHOAN VARCHAR(30),
    MATKHAU VARCHAR(30),
    PRIMARY KEY (MATKHAU)
);


-- TRIGGER KIỂM TRA SỐ LƯỢNG MÓN ĂN BẢNG ORDER CÓ <= BẢNG CHITIETPHANAN KHÔNG
CREATE OR REPLACE FUNCTION KiemTraSoLuongMon()
RETURNS TRIGGER AS $$
BEGIN
    IF EXISTS (
        SELECT I.SOLUONGMON
        FROM ORDERMONAN I
        WHERE I.SOLUONGMON > (
            SELECT CT.SOLUONGMON
            FROM CHITIETPHANAN CT
            WHERE CT.MAMON = I.MAMON AND CT.NGAY = I.NGAY
        )
    ) THEN
        RAISE EXCEPTION 'SO LUONG MON AN KHONG DU';
        RETURN NULL;
    END IF;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER KiemTraSoLuongMonTrigger
BEFORE INSERT ON ORDERMONAN
FOR EACH ROW EXECUTE FUNCTION KiemTraSoLuongMon();

-- TRIGGER UPDATE BẢNG CHITIETPHANAN, DOANHTHU
CREATE OR REPLACE FUNCTION UpdateSauKhiThemOrder()
RETURNS TRIGGER AS $$
DECLARE
    Ngay DATE;
    MaMon CHAR(4);
    SoLuongMon INT;
    Gia INT;
BEGIN
    SELECT NEW.NGAY, NEW.MAMON, NEW.SOLUONGMON INTO Ngay, MaMon, SoLuongMon;

    Gia := (
        SELECT GIA
        FROM MONAN
        WHERE MAMON = MaMon
    );

    -- Update số lượng món ăn bảng CHITIETPHANAN
    UPDATE CHITIETPHANAN
    SET SOLUONGMON = SOLUONGMON - SoLuongMon
    WHERE NGAY = Ngay AND MAMON = MaMon;

    -- Update tổng tiền bảng DOANHTHU
    UPDATE DOANHTHU
    SET TONGTIEN = TONGTIEN + (SoLuongMon * Gia)
    WHERE NGAY = Ngay;

    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER UpdateSauKhiThemOrderTrigger
AFTER INSERT ON ORDERMONAN
FOR EACH ROW EXECUTE FUNCTION UpdateSauKhiThemOrder();

-- TRIGGER CẬP NHẬT SẢN PHẨM TỒN KHO KHI THÊM CHI TIẾT NHẬP KHO
CREATE OR REPLACE FUNCTION UpdateSanPhamTonKhoKhiNhap()
RETURNS TRIGGER AS $$
BEGIN
    DECLARE
        MaSanPham CHAR(4);
        SoLuong INT;
    BEGIN
        SELECT NEW.MASANPHAM, NEW.SOLUONG INTO MaSanPham, SoLuong FROM CHITIETNHAPKHO WHERE MASANPHAM = NEW.MASANPHAM;
    
        -- Update số lượng sản phẩm
        UPDATE SANPHAMTONKHO
        SET SOLUONG = SOLUONG + SoLuong
        WHERE MASANPHAM = MaSanPham;

        RETURN NEW;
    END;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER UpdateSanPhamTonKhoKhiNhapTrigger
AFTER INSERT ON CHITIETNHAPKHO
FOR EACH ROW EXECUTE FUNCTION UpdateSanPhamTonKhoKhiNhap();

-- TRIGGER KIỂM TRA SỐ LƯỢNG SẢN PHẨM BẢNG SANPHAMXUATKHO CÓ <= SANPHAMTONKHO KHÔNG
CREATE OR REPLACE FUNCTION KiemTraSoLuongSanPhamXuatKho()
RETURNS TRIGGER AS $$
BEGIN
    IF EXISTS (
        SELECT I.SOLUONGSANPHAM
        FROM SANPHAMXUATKHO I
        WHERE I.SOLUONGSANPHAM > (
            SELECT SPT.SOLUONG
            FROM SANPHAMTONKHO SPT
            WHERE SPT.MASANPHAM = I.MASANPHAM
        )
    ) THEN
        RAISE EXCEPTION 'SO LUONG KHONG DU DE XUAT KHO';
        RETURN NULL;
    END IF;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER KiemTraSoLuongSanPhamXuatKhoTrigger
BEFORE INSERT ON SANPHAMXUATKHO
FOR EACH ROW EXECUTE FUNCTION KiemTraSoLuongSanPhamXuatKho();

-- TRIGGER UPDATE BẢNG SANPHAMTONKHO KHI XUẤT KHO
CREATE OR REPLACE FUNCTION UpdateSanPhamTonKhoKhiXuat()
RETURNS TRIGGER AS $$
BEGIN
    DECLARE
        MaSanPham CHAR(4);
        SoLuong INT;
    BEGIN
        SELECT NEW.MASANPHAM, NEW.SOLUONGSANPHAM INTO MaSanPham, SoLuong FROM SANPHAMXUATKHO WHERE MASANPHAM = NEW.MASANPHAM;
    
        -- Update số lượng sản phẩm
        UPDATE SANPHAMTONKHO
        SET SOLUONG = SOLUONG - SoLuong
        WHERE MASANPHAM = MaSanPham;

        RETURN NEW;
    END;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER UpdateSanPhamTonKhoKhiXuatTrigger
AFTER INSERT ON SANPHAMXUATKHO
FOR EACH ROW EXECUTE FUNCTION UpdateSanPhamTonKhoKhiXuat();

-- TRIGGER KIỂM TRA SỐ LƯỢNG SẢN PHẨM BẢNG CHITIETMUAHANG CÓ <= SANPHAMTONKHO KHÔNG
CREATE OR REPLACE FUNCTION KiemTraSoLuongChiTietMuaHang()
RETURNS TRIGGER AS $$
BEGIN
    IF EXISTS (
        SELECT I.SOLUONGSANPHAM
        FROM CHITIETMUAHANG I
        WHERE I.SOLUONGSANPHAM > (
            SELECT SPT.SOLUONG
            FROM SANPHAMTONKHO SPT
            WHERE SPT.MASANPHAM = I.MASANPHAM
        )
    ) THEN
        RAISE EXCEPTION 'SO LUONG SAN PHAM KHONG DU';
        RETURN NULL;
    END IF;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER KiemTraSoLuongChiTietMuaHangTrigger
BEFORE INSERT ON CHITIETMUAHANG
FOR EACH ROW EXECUTE FUNCTION KiemTraSoLuongChiTietMuaHang();

-- TRIGGER CẬP NHẬT BẢNG SANPHAMTONKHO VÀ DOANHTHU KHI MUA HÀNG
CREATE OR REPLACE FUNCTION UpdateSauKhiMuaHang()
RETURNS TRIGGER AS $$
BEGIN
    DECLARE
        MaSanPham CHAR(4);
        Ngay DATE;
        SoLuong INT;
        Gia FLOAT;
    BEGIN
        SELECT NEW.MASANPHAM, NEW.NGAY, NEW.SOLUONGSANPHAM INTO MaSanPham, Ngay, SoLuong FROM CHITIETMUAHANG WHERE MASANPHAM = NEW.MASANPHAM;
    
        -- Update số lượng sản phẩm
        UPDATE SANPHAMTONKHO
        SET SOLUONG = SOLUONG - SoLuong
        WHERE MASANPHAM = MaSanPham;

        -- Update DOANHTHU
        SELECT GIA INTO Gia FROM SANPHAMTONKHO WHERE MASANPHAM = MaSanPham;

        UPDATE DOANHTHU
        SET TONGTIEN = TONGTIEN + (Gia * SoLuong)
        WHERE NGAY = Ngay;

        RETURN NEW;
    END;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER UpdateSauKhiMuaHangTrigger
AFTER INSERT ON CHITIETMUAHANG
FOR EACH ROW EXECUTE FUNCTION UpdateSauKhiMuaHang();


INSERT INTO MONAN (MAMON, TENMON, PHOTO,GIA) VALUES ('MA01', 'Thịt kho trứng', 'https://drive.google.com/uc?export=view&id=1PlKdlZy2Nn8RFboUgdLEFhJ47SiEXHx2',25),
						('MA02', 'Tôm rim hành tỏi', 'https://drive.google.com/uc?export=view&id=1pYJgbRMQEOBFWcuRcQg_DQMLCHc2CiwN',25),
						('MA03', 'Thịt kho cải chua', 'https://drive.google.com/uc?export=view&id=1pp7_0lFUIZ-jQG4iPaBtRCkilCGEctF8',25),
						('MA04', 'Bò xào bắp non', 'https://drive.google.com/uc?export=view&id=1_5zJypb7AStQZ_NqG0c8wtOQumjXPtFG',25),
						('MA05', 'Óc móng tay xào rau muống', 'https://drive.google.com/uc?export=view&id=1Am3Suxy25nr8fvzJ0LF79KIDt3G0Ca4k',25),
						('MA06', 'Tim bò xào hành cần', 'https://drive.google.com/uc?export=view&id=1Ox9rfqO8IIfzrLenNnBvcjsvENhA1wFC',25),
						('MA07', 'Thịt kho tam củ', 'https://drive.google.com/uc?export=view&id=1Po0TVWW-Rr1wZ1TDJIX5XS4hivsOYHTM',25),
						('MA08', 'Sườn non chua ngọt', 'https://drive.google.com/uc?export=view&id=1Fxx6XqfXFk05UDUMAX2SMrfoPxIzqmBL',25),
						('MA09', 'Gà kho rau răm', 'https://drive.google.com/uc?export=view&id=1NAVR6BmiAFB1fptzyibYTWhN9ZTGypBA',25);



INSERT INTO LOAISANPHAM (MALOAI, TENLOAI) VALUES ('LO01', 'Nước đóng chai'),
												 ('LO02', 'Bánh đóng gói'),
												 ('LO03', 'Sữa');

INSERT INTO SANPHAMTONKHO (MASANPHAM, TENSANPHAM, PHOTO, SOLUONG, GIACA, LOAISANPHAM) VALUES  ('SP01', 'Sting', 'https://drive.google.com/uc?export=view&id=1GZUfRgHjIFL5KjhfZTEhQPfzMgB6cz5Q', 40, 10, 'LO01'),
											      ('SP02', 'Lavie', 'https://drive.google.com/uc?export=view&id=1dpysviPliDDEPmuYWRdJ58bOfO1rurMi',45, 6, 'LO01'),
											      ('SP03', 'Aquafina', 'https://drive.google.com/uc?export=view&id=1Qn0G_t_pBXtNoqU8bHasZ3Ol0Ofs7CkS', 45, 6, 'LO01'),
											      ('SP04', 'Trà xanh không độ', 'https://drive.google.com/uc?export=view&id=1SopyaZ40Z36GywNK0TS4ChD9K03oK3rD', 30, 10, 'LO01'),
											      ('SP05', 'Bánh mì chà bông Staff', 'https://drive.google.com/uc?export=view&id=1Qv60r-HXDx6VPE717eAbdZl5weFZQBUR', 20, 8, 'LO02'),
											      ('SP06', 'Bánh mì Otto', 'https://drive.google.com/uc?export=view&id=1g8tfXDyznPccbU50s4ippMT98Ou6XLAq', 20, 8, 'LO02'),
											      ('SP07', 'Gold Daisy bánh kem xốp sữa', 'https://drive.google.com/uc?export=view&id=1ZRp2Sg1p5szmYG-pjttHxIghhayGwpiu' ,15, 25, 'LO02'),
											      ('SP08', 'Khoai tây chiên slide', 'https://drive.google.com/uc?export=view&id=1QDUitnps7pNEzk0LVHq5--P9UJldkI_q', 20, 26, 'LO02'),
											      ('SP09', 'Milo', 'https://drive.google.com/uc?export=view&id=1NOat7pJHEnQO9RxA3OrwrkJ8vVsXHp4K', 30, 6, 'LO03'),
											      ('SP10', 'Vinamilk', 'https://drive.google.com/uc?export=view&id=1Hvej_IZUzgTOwXsspBD56CcYMbj1QNor', 20, 7, 'LO03');

INSERT INTO TAIKHOANADMIN (TAIKHOAN,MATKHAU ) VALUES ('admin', '123456');

