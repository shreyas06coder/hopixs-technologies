import React from 'react';
import { Icon } from './Icons';

export const ToastNotification = ({ notification, onClose }) => {
  if (!notification) return null;

  return (
    <div
      style={{
        position: 'fixed',
        bottom: '24px',
        right: '24px',
        zIndex: 9999,
        background: 'rgba(10, 18, 33, 0.94)',
        backdropFilter: 'blur(20px)',
        border: '1px solid var(--gold-border-strong)',
        boxShadow: '0 20px 50px rgba(0, 0, 0, 0.6), 0 0 20px rgba(212, 175, 55, 0.2)',
        borderRadius: 'var(--radius-md)',
        padding: '16px 20px',
        display: 'flex',
        alignItems: 'center',
        gap: '14px',
        maxWidth: '420px',
        animation: 'fadeIn 0.3s cubic-bezier(0.16, 1, 0.3, 1)'
      }}
    >
      <div
        style={{
          width: '38px',
          height: '38px',
          borderRadius: '50%',
          background: 'rgba(212, 175, 55, 0.15)',
          border: '1px solid var(--gold-border)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: 'var(--gold-400)',
          flexShrink: 0
        }}
      >
        <Icon name={notification.icon || 'check-circle'} size={20} color="var(--gold-400)" />
      </div>

      <div style={{ flex: 1 }}>
        <h4
          style={{
            fontFamily: 'var(--font-serif)',
            fontSize: '0.98rem',
            color: 'var(--warm-white)',
            marginBottom: '2px'
          }}
        >
          {notification.title}
        </h4>
        <p style={{ fontSize: '0.82rem', color: 'var(--text-secondary)', margin: 0 }}>
          {notification.message}
        </p>
      </div>

      <button
        onClick={onClose}
        style={{
          background: 'transparent',
          color: 'var(--text-muted)',
          padding: '4px',
          borderRadius: '4px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}
        aria-label="Close notification"
      >
        <Icon name="x" size={16} />
      </button>
    </div>
  );
};
