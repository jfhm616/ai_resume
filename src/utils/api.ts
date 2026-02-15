const API_KEY = '8e5808e4abf5498da7634e71d4c182bf.MUZDQorINNMASvMv';
const API_URL = 'https://open.bigmodel.cn/api/paas/v4/chat/completions';

export interface ParsedResume {
  basicInfo?: {
    name?: string;
    phone?: string;
    email?: string;
    jobIntent?: string;
    personalWebsite?: string;
  };
  education?: Array<{
    timeRange?: string;
    school?: string;
    major?: string;
    degree?: string;
    description?: string;
  }>;
  workExperience?: Array<{
    timeRange?: string;
    company?: string;
    position?: string;
    description?: string;
  }>;
  projectExperience?: Array<{
    timeRange?: string;
    name?: string;
    role?: string;
    description?: string;
  }>;
  skills?: Array<{
    name?: string;
  }>;
  selfEvaluation?: string;
}

export async function parseResumeWithAI(text: string): Promise<ParsedResume> {
  const systemPrompt = `你是一个简历信息提取助手。请从用户提供的文本中提取简历信息，并以JSON格式返回。

提取规则：
1. 姓名：提取姓名
2. 电话：提取电话号码
3. 邮箱：提取邮箱地址
4. 求职意向：提取求职意向/目标岗位
5. 个人主页：提取GitHub、博客等链接
6. 教育背景：提取学校、专业、学历、时间段，存入education数组
7. 工作经历：提取公司名、岗位、时间、工作描述，存入workExperience数组
8. 项目经验：提取项目名、角色、时间、项目描述，存入projectExperience数组
9. 技能：提取技能名称，存入skills数组
10. 自我评价：提取总结性描述

请严格按照以下JSON格式返回（只返回JSON，不要其他内容）：
{
  "basicInfo": {"name": "", "phone": "", "email": "", "jobIntent": "", "personalWebsite": ""},
  "education": [{"timeRange": "", "school": "", "major": "", "degree": "", "description": ""}],
  "workExperience": [{"timeRange": "", "company": "", "position": "", "description": ""}],
  "projectExperience": [{"timeRange": "", "name": "", "role": "", "description": ""}],
  "skills": [{"name": ""}],
  "selfEvaluation": ""
}`;

  const userContent = `请从以下文本中提取简历信息：\n\n${text}`;

  try {
    const response = await fetch(API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${API_KEY}`,
      },
      body: JSON.stringify({
        model: 'glm-4-flash',
        messages: [
          { role: 'system', content: systemPrompt },
          { role: 'user', content: userContent },
        ],
        temperature: 0.1,
        stream: false,
      }),
    });

    if (!response.ok) {
      throw new Error(`API请求失败: ${response.status}`);
    }

    const data = await response.json();
    const content = data.choices[0].message.content;
    
    // 提取JSON部分
    const jsonMatch = content.match(/\{[\s\S]*\}/);
    if (jsonMatch) {
      return JSON.parse(jsonMatch[0]);
    }
    
    throw new Error('无法解析AI返回的内容');
  } catch (error) {
    console.error('AI解析失败:', error);
    throw error;
  }
}
