# 成都OPC中心 - 图片素材需求清单

## 📸 需要准备的图片

### 一、Logo和品牌
1. **logo.png** (200x200px)
   - 成都OPC中心的Logo
   - 建议：简洁的AI/科技风格图标

### 二、首页素材
2. **hero-banner.jpg** (1920x800px)
   - 首页主视觉横幅
   - 建议内容：团队合影或AI主题插画

3. **value-interesting.svg** (图标)
   - "有意思"价值观图标
   - 建议：游戏手柄、笑脸、火花等

4. **value-growth.svg** (图标)
   - "有成长"价值观图标
   - 建议：向上箭头、树苗、阶梯等

5. **value-system.svg** (图标)
   - "有体系"价值观图标
   - 建议：路径图、地图、系统图等

### 三、三条航道图标
6. **ship-explorer.png** (400x400px)
   - 🚢 探索者号
   - 建议：小船、探险图标

7. **ship-producer.png** (400x400px)
   - 🛳️ 生产者号
   - 建议：中型船、工厂图标

8. **ship-navigator.png** (400x400px)
   - 🚀 领航员号
   - 建议：火箭、飞船图标

### 四、角色系统图标
9. **role-atmosphere.png** (200x200px)
   - 👏 氛围组
   - 建议：鼓掌、笑脸、气氛图标

10. **role-action.png** (200x200px)
    - 🚀 行动派
    - 建议：火箭、闪电、行动图标

11. **role-recorder.png** (200x200px)
    - 📝 记录官
    - 建议：笔记本、相机、记录图标

12. **role-advisor.png** (200x200px)
    - 💡 参谋官
    - 建议：灯泡、智慧、策略图标

### 五、过往活动照片（重点！）

#### 活动1示例
13. **activity-1-cover.jpg** (800x600px)
    - 活动封面图
    - 建议：活动现场全景照片

14. **activity-1-photo-1.jpg** (800x600px)
    - 活动照片1
    - 建议：成员互动照片

15. **activity-1-photo-2.jpg** (800x600px)
    - 活动照片2
    - 建议：分享环节照片

16. **activity-1-photo-3.jpg** (800x600px)
    - 活动照片3
    - 建议：作品展示照片

#### 活动2示例
17. **activity-2-cover.jpg** (800x600px)
18. **activity-2-photo-1.jpg** (800x600px)
19. **activity-2-photo-2.jpg** (800x600px)
20. **activity-2-photo-3.jpg** (800x600px)

#### 活动3示例
21. **activity-3-cover.jpg** (800x600px)
22. **activity-3-photo-1.jpg** (800x600px)
23. **activity-3-photo-2.jpg** (800x600px)

**注意**：每个活动建议准备3-6张照片

### 六、成员作品示例
24. **work-video-example.jpg** (600x400px)
    - AI视频作品截图

25. **work-image-example.jpg** (600x400px)
    - AI图片作品

26. **work-animation-example.jpg** (600x400px)
    - AI动画作品截图

27. **work-text-example.jpg** (600x400px)
    - AI文案作品展示

### 七、占位图和默认图
28. **default-avatar.png** (200x200px)
    - 默认用户头像

29. **placeholder-activity.jpg** (800x600px)
    - 活动占位图

30. **placeholder-work.jpg** (600x400px)
    - 作品占位图

---

## 📋 图片使用说明

### 图片存放位置
```
frontend/public/images/
├── logo/
│   └── logo.png
├── hero/
│   └── hero-banner.jpg
├── icons/
│   ├── value-interesting.svg
│   ├── value-growth.svg
│   ├── value-system.svg
│   ├── ship-explorer.png
│   ├── ship-producer.png
│   ├── ship-navigator.png
│   ├── role-atmosphere.png
│   ├── role-action.png
│   ├── role-recorder.png
│   └── role-advisor.png
├── activities/
│   ├── activity-1-cover.jpg
│   ├── activity-1-photo-1.jpg
│   ├── activity-1-photo-2.jpg
│   └── ...
├── works/
│   ├── work-video-example.jpg
│   ├── work-image-example.jpg
│   └── ...
└── placeholders/
    ├── default-avatar.png
    ├── placeholder-activity.jpg
    └── placeholder-work.jpg
```

### 图片规格要求
- **格式**: JPG (照片), PNG (图标/Logo), SVG (矢量图标)
- **质量**: 高清，但文件大小控制在500KB以内
- **尺寸**: 按照上述建议尺寸准备
- **命名**: 使用英文小写+连字符，如 `activity-1-cover.jpg`

---

## 🎨 临时解决方案

如果暂时没有图片，可以使用：

### 1. 占位图服务
```javascript
// 在代码中使用占位图
const placeholderImage = `https://via.placeholder.com/800x600/4F46E5/FFFFFF?text=活动照片`;
```

### 2. 免费图库
- **Unsplash**: https://unsplash.com (高质量免费图片)
- **Pexels**: https://pexels.com (免费图片和视频)
- **Pixabay**: https://pixabay.com (免费图片)

### 3. AI生成图片
使用AI工具生成所需图片：
- **Midjourney**: 高质量AI图片生成
- **DALL-E**: OpenAI的图片生成工具
- **Stable Diffusion**: 开源AI图片生成

### 4. 图标库
- **Font Awesome**: https://fontawesome.com (已集成)
- **Heroicons**: https://heroicons.com
- **Lucide**: https://lucide.dev

---

## 📝 图片准备优先级

### 🔴 高优先级（必须）
1. Logo (logo.png)
2. 活动封面图 (至少3个活动)
3. 活动照片 (每个活动3-6张)
4. 占位图 (default-avatar.png, placeholder-activity.jpg)

### 🟡 中优先级（建议）
5. 三条航道图标
6. 角色系统图标
7. 成员作品示例

### 🟢 低优先级（可选）
8. Hero横幅
9. 价值观图标
10. 其他装饰性图片

---

## 🚀 快速开始（无图片版本）

如果暂时没有图片，网站仍然可以正常运行：
- 使用Font Awesome图标代替
- 使用渐变色背景代替图片
- 使用占位图服务

代码已经做了兼容处理，没有图片也能正常显示！

---

## 📞 需要帮助？

如果需要：
1. 图片设计建议
2. AI生成图片的提示词
3. 图片优化和压缩
4. 图片上传和管理

随时告诉我！
