export type New = {
  id: string;
  status: string;
  ten: string;
  ngay_xuat_ban: string;
  chuyen_muc_tin: {
    id: string;
    ten: string;
    loai: string;
  }
}

export type ChuyenMucTin = {
  id: string;
  ten: string;
  loai: string;
}
export type FetchResult<T> = {
  data: T[];
  meta: {
    total_count: number;
  };
};
