import { FiPlus, FiTrash2 } from 'react-icons/fi';
import { useResumeStore } from '../../store/resumeStore';

export default function WorkExperienceEditor() {
  const { resumeData, addWorkExperience, updateWorkExperience, removeWorkExperience } = useResumeStore();
  const { workExperience } = resumeData;

  return (
    <div className="space-y-5">
      {workExperience.length === 0 ? (
        <div className="text-center py-8 text-slate-500">
          暂无工作/实习经历
        </div>
      ) : (
        workExperience.map((item, index) => (
          <div key={item.id} className="bg-slate-50 p-5 rounded-lg space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-sm font-medium text-slate-700">工作经历 {index + 1}</span>
              <button
                onClick={() => removeWorkExperience(item.id)}
                className="text-red-500 hover:text-red-700 transition-colors"
              >
                <FiTrash2 className="w-4 h-4" />
              </button>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm text-slate-600 mb-1">时间段</label>
                <input
                  type="text"
                  value={item.timeRange}
                  onChange={(e) => updateWorkExperience(item.id, 'timeRange', e.target.value)}
                  placeholder="例如：2023.06 - 2023.12"
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm text-slate-600 mb-1">岗位名称</label>
                <input
                  type="text"
                  value={item.position}
                  onChange={(e) => updateWorkExperience(item.id, 'position', e.target.value)}
                  placeholder="请输入岗位名称"
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm text-slate-600 mb-1">公司/单位名称</label>
              <input
                type="text"
                value={item.company}
                onChange={(e) => updateWorkExperience(item.id, 'company', e.target.value)}
                placeholder="请输入公司名称"
                className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm text-slate-600 mb-1">工作描述</label>
              <textarea
                value={item.description}
                onChange={(e) => updateWorkExperience(item.id, 'description', e.target.value)}
                placeholder="描述工作内容、职责、成就等，建议使用STAR法则"
                rows={4}
                className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
              />
            </div>
          </div>
        ))
      )}

      <button
        onClick={addWorkExperience}
        className="w-full py-3 border-2 border-dashed border-slate-300 rounded-lg text-slate-600 hover:border-blue-500 hover:text-blue-600 transition-colors flex items-center justify-center gap-2"
      >
        <FiPlus className="w-5 h-5" />
        添加工作/实习经历
      </button>
    </div>
  );
}
