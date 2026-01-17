
import React from 'react';
import { UserData } from '../../types';

interface UserProfileDisplayProps {
  userData: UserData | null;
}

const UserProfileDisplay: React.FC<UserProfileDisplayProps> = ({ userData }) => {
  if (!userData) return null;

  const profileItems = [
    { label: 'Họ và tên', value: userData.fullName },
    { label: 'Email', value: userData.email },
    { label: 'Năm sinh', value: userData.birthYear },
    { label: 'Giới tính', value: userData.gender },
    { label: 'Khu vực', value: userData.location },
    { label: 'Học vấn', value: userData.educationLevel },
    { label: 'Trạng thái', value: userData.status },
    { label: 'Mong muốn', value: userData.expectations, fullWidth: true },
  ];

  return (
    <div className="mb-8 p-6 bg-slate-50 dark:bg-slate-900/50 rounded-2xl border border-slate-200 dark:border-slate-700">
      <h3 className="text-xl font-bold mb-6 text-sage-800 dark:text-sage-300 flex items-center gap-2">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
        </svg>
        Hồ sơ cá nhân
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-6">
        {profileItems.map(item => (
          item.value ? (
            <div key={item.label} className={item.fullWidth ? "md:col-span-2 lg:col-span-3" : ""}>
              <p className="text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 mb-1">{item.label}</p>
              <p className="text-sm font-medium text-slate-800 dark:text-slate-200">{item.value}</p>
            </div>
          ) : null
        ))}
      </div>
    </div>
  );
};

export default UserProfileDisplay;
