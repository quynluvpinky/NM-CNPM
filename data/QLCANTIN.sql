-- Xóa bảng nếu tồn tại
DROP TABLE IF EXISTS CHITIETPHANAN, SANPHAMXUATKHO, CHITIETNHAPKHO, SANPHAMTONKHO, LOAISANPHAM, NHACUNGUNG, DOANHTHU, MONAN, SODIENTHOAINCU;

-- Tạo bảng MONAN
CREATE TABLE MONAN (
    MAMON CHAR(4) PRIMARY KEY,
    TENMON VARCHAR(30),
    PHOTO VARCHAR(250)
);

-- Tạo bảng DOANHTHU
CREATE TABLE DOANHTHU (
    NGAY DATE PRIMARY KEY,
    TONGTIEN DOUBLE PRECISION
);

-- Tạo bảng NHACUNGUNG
CREATE TABLE NHACUNGUNG (
    MANCU CHAR(4) PRIMARY KEY,
    TENNCU VARCHAR(30),
    DIACHI VARCHAR(30)
);

-- Tạo bảng LOAISANPHAM
CREATE TABLE LOAISANPHAM (
    MALOAI CHAR(4) PRIMARY KEY,
    TENLOAI VARCHAR(30)
);

-- Tạo bảng SODIENTHOAINCU
CREATE TABLE SODIENTHOAINCU (
    MANCU CHAR(4),
    SODIENTHOAI CHAR(10),
    PRIMARY KEY (MANCU, SODIENTHOAI),
    FOREIGN KEY (MANCU) REFERENCES NHACUNGUNG(MANCU)
);

-- Tạo bảng SANPHAMTONKHO
CREATE TABLE SANPHAMTONKHO (
    MASANPHAM CHAR(4) PRIMARY KEY,
    TENSANPHAM VARCHAR(30),
    PHOTO VARCHAR(250),
    SOLUONG INT,
    GIACA DOUBLE PRECISION,
    LOAISANPHAM CHAR(4),
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
    FOREIGN KEY (MASANPHAM) REFERENCES SANPHAMTONKHO(MASANPHAM),
    FOREIGN KEY (NGAY) REFERENCES DOANHTHU(NGAY)
);

-- Tạo bảng CHITIETPHANAN
CREATE TABLE CHITIETPHANAN (
    NGAY DATE,
    MAMON CHAR(4),
    SOLUONGMON INT,
    PRIMARY KEY (NGAY, MAMON),
    FOREIGN KEY (NGAY) REFERENCES DOANHTHU(NGAY),
    FOREIGN KEY (MAMON) REFERENCES MONAN(MAMON)
);

-- Tạo bảng TAIKHOANADMIN
CREATE TABLE TAIKHOANADMIN (
    TAIKHOAN VARCHAR(30),
    MATKHAU VARCHAR(30),
    PRIMARY KEY (MATKHAU)
);

-- Tạo trigger UpdateTongTienOnChiTietPhanAn
CREATE OR REPLACE FUNCTION update_tongtien_chitietphanan() RETURNS TRIGGER AS $$
BEGIN
    UPDATE DOANHTHU
    SET TONGTIEN = TONGTIEN + (NEW.SOLUONGMON * 25)
    WHERE DOANHTHU.NGAY = NEW.NGAY;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER UpdateTongTienOnChiTietPhanAn
AFTER INSERT
ON CHITIETPHANAN
FOR EACH ROW
EXECUTE FUNCTION update_tongtien_chitietphanan();

-- Tạo trigger UpdateTongTienOnSanPhamXuatKho
CREATE OR REPLACE FUNCTION update_tongtien_sanphamxuatkho() RETURNS TRIGGER AS $$
BEGIN
    UPDATE DOANHTHU
    SET TONGTIEN = TONGTIEN + (NEW.SOLUONGSANPHAM * SP.GIACA)
    FROM SANPHAMTONKHO SP
    WHERE DOANHTHU.NGAY = NEW.NGAY AND SP.MASANPHAM = NEW.MASANPHAM;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER UpdateTongTienOnSanPhamXuatKho
AFTER INSERT
ON SANPHAMXUATKHO
FOR EACH ROW
EXECUTE FUNCTION update_tongtien_sanphamxuatkho();

INSERT INTO MONAN (MAMON, TENMON, PHOTO) VALUES ('MA01', 'Thịt kho trứng', 'https://drive.google.com/drive/folders/1e65zZvOSJvo8psmrIaANLzMGlNkvr_Qf?fbclid=IwAR0aGb8eXmxeTj4u7rEOLVIu1TWDJWEmucVuSYywztseXTwORqMgSpXe0hE'),
										 ('MA02', 'Tôm rim hành tỏi', 'https://drive.google.com/drive/folders/1e65zZvOSJvo8psmrIaANLzMGlNkvr_Qf?fbclid=IwAR0aGb8eXmxeTj4u7rEOLVIu1TWDJWEmucVuSYywztseXTwORqMgSpXe0hE'),
										 ('MA03', 'Thịt kho cải chua', 'https://drive.google.com/drive/folders/1e65zZvOSJvo8psmrIaANLzMGlNkvr_Qf?fbclid=IwAR0aGb8eXmxeTj4u7rEOLVIu1TWDJWEmucVuSYywztseXTwORqMgSpXe0hE'),
										 ('MA04', 'Bò xào bắp non', 'https://drive.google.com/drive/folders/1e65zZvOSJvo8psmrIaANLzMGlNkvr_Qf?fbclid=IwAR0aGb8eXmxeTj4u7rEOLVIu1TWDJWEmucVuSYywztseXTwORqMgSpXe0hE'),
										 ('MA05', 'Óc móng tay xào rau muống', 'https://drive.google.com/drive/folders/1e65zZvOSJvo8psmrIaANLzMGlNkvr_Qf?fbclid=IwAR0aGb8eXmxeTj4u7rEOLVIu1TWDJWEmucVuSYywztseXTwORqMgSpXe0hE'),
										 ('MA06', 'Tim bò xào hành cần', 'https://drive.google.com/drive/folders/1e65zZvOSJvo8psmrIaANLzMGlNkvr_Qf?fbclid=IwAR0aGb8eXmxeTj4u7rEOLVIu1TWDJWEmucVuSYywztseXTwORqMgSpXe0hE'),
										 ('MA07', 'Thịt kho tam củ', 'https://drive.google.com/drive/folders/1e65zZvOSJvo8psmrIaANLzMGlNkvr_Qf?fbclid=IwAR0aGb8eXmxeTj4u7rEOLVIu1TWDJWEmucVuSYywztseXTwORqMgSpXe0hE'),
										 ('MA08', 'Sườn non chua ngọt', 'https://drive.google.com/drive/folders/1e65zZvOSJvo8psmrIaANLzMGlNkvr_Qf?fbclid=IwAR0aGb8eXmxeTj4u7rEOLVIu1TWDJWEmucVuSYywztseXTwORqMgSpXe0hE'),
										 ('MA09', 'Gà kho rau răm', 'https://drive.google.com/drive/folders/1e65zZvOSJvo8psmrIaANLzMGlNkvr_Qf?fbclid=IwAR0aGb8eXmxeTj4u7rEOLVIu1TWDJWEmucVuSYywztseXTwORqMgSpXe0hE');



INSERT INTO LOAISANPHAM (MALOAI, TENLOAI) VALUES ('LO01', 'Nước đóng chai'),
												 ('LO02', 'Bánh đóng gói'),
												 ('LO03', 'Sữa');

INSERT INTO SANPHAMTONKHO (MASANPHAM, TENSANPHAM, PHOTO, SOLUONG, GIACA, LOAISANPHAM) VALUES  ('SP01', 'Sting', 'https://drive.google.com/drive/folders/1e65zZvOSJvo8psmrIaANLzMGlNkvr_Qf?fbclid=IwAR0aGb8eXmxeTj4u7rEOLVIu1TWDJWEmucVuSYywztseXTwORqMgSpXe0hE', 40, 10, 'LO01'),
																					   ('SP02', 'Lavie', 'https://drive.google.com/drive/folders/1e65zZvOSJvo8psmrIaANLzMGlNkvr_Qf?fbclid=IwAR0aGb8eXmxeTj4u7rEOLVIu1TWDJWEmucVuSYywztseXTwORqMgSpXe0hE',45, 6, 'LO01'),
																					   ('SP03', 'Aquafina', 'https://drive.google.com/drive/folders/1e65zZvOSJvo8psmrIaANLzMGlNkvr_Qf?fbclid=IwAR0aGb8eXmxeTj4u7rEOLVIu1TWDJWEmucVuSYywztseXTwORqMgSpXe0hE', 45, 6, 'LO01'),
																					   ('SP04', 'Trà xanh không độ', 'https://drive.google.com/drive/folders/1e65zZvOSJvo8psmrIaANLzMGlNkvr_Qf?fbclid=IwAR0aGb8eXmxeTj4u7rEOLVIu1TWDJWEmucVuSYywztseXTwORqMgSpXe0hE', 30, 10, 'LO01'),
																					   ('SP05', 'Bánh mì chà bông Staff', 'https://drive.google.com/drive/folders/1e65zZvOSJvo8psmrIaANLzMGlNkvr_Qf?fbclid=IwAR0aGb8eXmxeTj4u7rEOLVIu1TWDJWEmucVuSYywztseXTwORqMgSpXe0hE', 20, 8, 'LO02'),
																					   ('SP06', 'Bánh mì Otto', 'https://drive.google.com/drive/folders/1e65zZvOSJvo8psmrIaANLzMGlNkvr_Qf?fbclid=IwAR0aGb8eXmxeTj4u7rEOLVIu1TWDJWEmucVuSYywztseXTwORqMgSpXe0hE', 20, 8, 'LO02'),
																					   ('SP07', 'Gold Daisy bánh kem xốp sữa', 'https://drive.google.com/drive/folders/1e65zZvOSJvo8psmrIaANLzMGlNkvr_Qf?fbclid=IwAR0aGb8eXmxeTj4u7rEOLVIu1TWDJWEmucVuSYywztseXTwORqMgSpXe0hE' ,15, 25, 'LO02'),
																					   ('SP08', 'Khoai tây chiên slide', 'https://drive.google.com/drive/folders/1e65zZvOSJvo8psmrIaANLzMGlNkvr_Qf?fbclid=IwAR0aGb8eXmxeTj4u7rEOLVIu1TWDJWEmucVuSYywztseXTwORqMgSpXe0hE', 20, 26, 'LO02'),
																					   ('SP09', 'Milo', 'https://drive.google.com/drive/folders/1e65zZvOSJvo8psmrIaANLzMGlNkvr_Qf?fbclid=IwAR0aGb8eXmxeTj4u7rEOLVIu1TWDJWEmucVuSYywztseXTwORqMgSpXe0hE', 30, 6, 'LO03'),
																					   ('SP10', 'Vinamilk', 'https://drive.google.com/drive/folders/1e65zZvOSJvo8psmrIaANLzMGlNkvr_Qf?fbclid=IwAR0aGb8eXmxeTj4u7rEOLVIu1TWDJWEmucVuSYywztseXTwORqMgSpXe0hE', 20, 7, 'LO03');

INSERT INTO TAIKHOANADMIN (TAIKHOAN,MATKHAU ) VALUES ('admin', '123456');