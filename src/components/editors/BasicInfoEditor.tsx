import { useRef } from 'react';
import { useResumeStore } from '../../store/resumeStore';
import { FiUpload, FiX } from 'react-icons/fi';

export default function BasicInfoEditor() {
  const { resumeData, updateBasicInfo } = useResumeStore();
  const { basicInfo } = resumeData;
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        updateBasicInfo('avatar', event.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRemoveAvatar = () => {
    updateBasicInfo('avatar', '');
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <div className="space-y-5">
      <div>
        <label className="block text-sm font-medium text-slate-700 mb-2">
          姓名 <span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          value={basicInfo.name}
          onChange={(e) => updateBasicInfo('name', e.target.value)}
          placeholder="请输入姓名"
          className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-slate-700 mb-2">
          求职意向 <span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          value={basicInfo.jobIntent}
          onChange={(e) => updateBasicInfo('jobIntent', e.target.value)}
          placeholder="例如：前端开发工程师"
          className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-2">
            手机号 <span className="text-red-500">*</span>
          </label>
          <input
            type="tel"
            value={basicInfo.phone}
            onChange={(e) => updateBasicInfo('phone', e.target.value)}
            placeholder="请输入手机号"
            className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-2">
            邮箱 <span className="text-red-500">*</span>
          </label>
          <input
            type="email"
            value={basicInfo.email}
            onChange={(e) => updateBasicInfo('email', e.target.value)}
            placeholder="请输入邮箱"
            className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-slate-700 mb-2">
          头像上传
        </label>
        <div className="flex items-center gap-4">
          <div className="relative w-20 h-20 bg-slate-100 rounded-lg flex items-center justify-center overflow-hidden">
            {basicInfo.avatar ? (
              <img src={basicInfo.avatar} alt="头像" className="w-full h-full object-cover" />
            ) : (
              <span className="text-slate-400 text-sm">暂无头像</span>
            )}
            {basicInfo.avatar && (
              <button
                onClick={handleRemoveAvatar}
                className="absolute top-0 right-0 w-5 h-5 bg-red-500 text-white rounded-full flex items-center justify-center"
              >
                <FiX className="w-3 h-3" />
              </button>
            )}
          </div>
          <input
            type="file"
            ref={fileInputRef}
            accept="image/*"
            onChange={handleFileChange}
            className="hidden"
            id="avatar-upload"
          />
          <label
            htmlFor="avatar-upload"
            className="px-4 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors cursor-pointer flex items-center gap-2"
          >
            <FiUpload className="w-4 h-4" />
            选择图片
          </label>
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-slate-700 mb-2">
          个人主页（可选）
        </label>
        <input
          type="text"
          value={basicInfo.personalWebsite}
          onChange={(e) => updateBasicInfo('personalWebsite', e.target.value)}
          placeholder="例如：github.com/yourname"
          className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
      </div>
    </div>
  );
}
