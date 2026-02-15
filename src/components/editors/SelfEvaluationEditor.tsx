import { useResumeStore } from '../../store/resumeStore';

export default function SelfEvaluationEditor() {
  const { resumeData, updateSelfEvaluation } = useResumeStore();

  return (
    <div className="space-y-5">
      <div>
        <label className="block text-sm font-medium text-slate-700 mb-2">
          自我评价
        </label>
        <textarea
          value={resumeData.selfEvaluation}
          onChange={(e) => updateSelfEvaluation(e.target.value)}
          placeholder="请简要描述你的优势、职业规划等，建议80-150字"
          rows={8}
          className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
        />
        <p className="text-sm text-slate-500 mt-2">
          字数：{resumeData.selfEvaluation.length} 字
        </p>
      </div>
    </div>
  );
}
