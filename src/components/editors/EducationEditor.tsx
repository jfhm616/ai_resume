import { FiPlus, FiTrash2 } from 'react-icons/fi';
import { useResumeStore } from '../../store/resumeStore';

export default function EducationEditor() {
  const { resumeData, addEducation, updateEducation, removeEducation } = useResumeStore();
  const { education } = resumeData;

  return (
    <div className="space-y-5">
      {education.length === 0 ? (
        <div className="text-center py-8 text-slate-500">
          暂无教育背景信息
        </div>
      ) : (
        education.map((item, index) => (
          <div key={item.id} className="bg-slate-50 p-5 rounded-lg space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-sm font-medium text-slate-700">教育经历 {index + 1}</span>
              <button
                onClick={() => removeEducation(item.id)}
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
                  onChange={(e) => updateEducation(item.id, 'timeRange', e.target.value)}
                  placeholder="例如：2020.09 - 2024.06"
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm text-slate-600 mb-1">学历</label>
                <input
                  type="text"
                  value={item.degree}
                  onChange={(e) => updateEducation(item.id, 'degree', e.target.value)}
                  placeholder="例如：本科"
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm text-slate-600 mb-1">学校名称</label>
              <input
                type="text"
                value={item.school}
                onChange={(e) => updateEducation(item.id, 'school', e.target.value)}
                placeholder="请输入学校名称"
                className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm text-slate-600 mb-1">专业</label>
              <input
                type="text"
                value={item.major}
                onChange={(e) => updateEducation(item.id, 'major', e.target.value)}
                placeholder="请输入专业名称"
                className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm text-slate-600 mb-1">描述（可选）</label>
              <textarea
                value={item.description}
                onChange={(e) => updateEducation(item.id, 'description', e.target.value)}
                placeholder="可添加成绩、荣誉等信息"
                rows={2}
                className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
              />
            </div>
          </div>
        ))
      )}

      <button
        onClick={addEducation}
        className="w-full py-3 border-2 border-dashed border-slate-300 rounded-lg text-slate-600 hover:border-blue-500 hover:text-blue-600 transition-colors flex items-center justify-center gap-2"
      >
        <FiPlus className="w-5 h-5" />
        添加教育经历
      </button>
    </div>
  );
}
