'use client';

import React from 'react';
import documentsData from '@/data/documents.json';
import notificationsData from '@/data/notifications.json';

const DocumentsTable: React.FC = () => {
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
                  {documentsData.documents.map((doc) => (
                    <tr key={doc.id}>
                      <td style={{ color: 'black' }}>{doc.code}</td>
                      <td style={{ color: 'black' }}>{doc.date}</td>
                      <td>{doc.summary}</td>
                    </tr>
                  ))}
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
                {notificationsData.notifications.map((notif) => (
                  <div key={notif.id} className="notif-item">
                    <span className="notif-sound">🔊</span>
                    <p>{notif.content}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DocumentsTable;
