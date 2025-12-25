'use client';

import React, { useEffect, useState } from 'react';

interface DocumentItem {
  id: number;
  so_ky_hieu: string;
  trich_yeu: string;
  ngay_ban_hanh: string;
  code: string;
  summary: string;
  date: string;
}

interface NotificationItem {
  id: number;
  ten: string;
  noi_dung?: string;
  title: string;
  content?: string;
  date: string;
}

const DocumentsTable: React.FC = () => {
  // ===== CẤU HÌNH: Thay đổi ID cơ quan ban hành tại đây =====
  const CO_QUAN_BAN_HANH = 3;  // ID cơ quan ban hành (3 = Chính phủ)
  // ===========================================================

  const [documents, setDocuments] = useState<DocumentItem[]>([]);
  const [notifications, setNotifications] = useState<NotificationItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [notifLoading, setNotifLoading] = useState(true);

  useEffect(() => {
    const fetchDocuments = async () => {
      try {
        console.log(' Đang lấy văn bản pháp luật...');
        const response = await fetch(`/api/documents?co_quan_ban_hanh=${CO_QUAN_BAN_HANH}`);

        if (!response.ok) {
          throw new Error(`Failed to fetch documents: ${response.status}`);
        }

        const data = await response.json();
        console.log(' Đã lấy văn bản:', data);
        setDocuments(data);
      } catch (error) {
        console.error(' Lỗi khi lấy văn bản:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchDocuments();
  }, [CO_QUAN_BAN_HANH]);

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        console.log(' Đang lấy thông báo...');
        const response = await fetch('/api/notifications');

        if (!response.ok) {
          throw new Error(`Failed to fetch notifications: ${response.status}`);
        }

        const data = await response.json();
        console.log(' Đã lấy thông báo:', data);
        setNotifications(data);
      } catch (error) {
        console.error(' Lỗi khi lấy thông báo:', error);
      } finally {
        setNotifLoading(false);
      }
    };

    fetchNotifications();
  }, []);

  return (
    <div className="container">
      <div className="bang mt-4">
        <div className="row">
          <div className="col-lg-8 col-md-12">
            <div className="table-responsive">
              <table className="table table-bordered">
                <thead>
                  <tr className="table-info">
                    <th style={{ backgroundColor: '#0280CD', color: 'white' }}>
                      Số/Ký hiệu
                    </th>
                    <th style={{ backgroundColor: '#0280CD', color: 'white'}}>
                      Ngày phát hành
                    </th>
                    <th style={{ backgroundColor: '#0280CD', color: 'white' }}>
                      Trích yếu
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {loading ? (
                    <tr>
                      <td colSpan={3} className="text-center">Đang tải...</td>
                    </tr>
                  ) : documents.length > 0 ? (
                    documents.map((doc) => (
                      <tr key={doc.id}>
                        <td style={{ color: 'black' }}>{doc.code}</td>
                        <td style={{ color: 'black' }}>{doc.date}</td>
                        <td>{doc.summary}</td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={3} className="text-center">Không có văn bản</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>

          <div className="col-lg-4 col-md-12">
            <div className="notification-card">
              <div className="notif-header py-3">
                <span className="notif-bell">🔔</span>
                <span className="notif-title">THÔNG BÁO</span>
              </div>
              <div className="notif-body">
                {notifLoading ? (
                  <div className="text-center py-3">Đang tải...</div>
                ) : notifications.length > 0 ? (
                  notifications.map((notif) => (
                    <div key={notif.id} className="notif-item">
                      <span className="notif-sound">🔊</span>
                      <p>{notif.ten}</p>
                    </div>
                  ))
                ) : (
                  <div className="text-center py-3">Không có thông báo</div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DocumentsTable;
