import { useEffect, useMemo, useRef, useState } from "react";

const categories = [
  {
    id: "learning",
    label: "学习与实践",
    index: "01",
    description: "把知道变成会做，把会做变成能够被验证的输出。",
    accent: "lilac",
  },
  {
    id: "action",
    label: "行动与协作",
    index: "02",
    description: "关于选择、表达、协作，以及把一件事可靠地做完。",
    accent: "blue",
  },
  {
    id: "growth",
    label: "成长与关系",
    index: "03",
    description: "少一点急于证明，多一点可以长期积累的个人资本。",
    accent: "peach",
  },
  {
    id: "health",
    label: "健康记录",
    index: "04",
    description: "尊重证据边界，观察身体，也照顾每天的能量。",
    accent: "mint",
  },
  {
    id: "investing",
    label: "交易与风险",
    index: "05",
    description: "把感觉写成规则，把规则放进可以验证的系统。",
    accent: "amber",
  },
  {
    id: "system",
    label: "知识系统",
    index: "06",
    description: "一个事实来源，多个观察视角，让知识被反复使用。",
    accent: "rose",
  },
];

const notes = [
  {
    id: "learning-loop",
    number: "001",
    category: "learning",
    title: "判断自己是否真的学会",
    summary: "不把“看懂了”当作结果，而是检查能否独立解释、修改、排错和交付。",
    highlight: "学习的终点不是收藏，而是可以复现的输出。",
    source: "01-学习与项目实践.md",
    minutes: 4,
    updated: "2026.08",
    tags: ["学习闭环", "输出", "复盘"],
    bullets: [
      "不看教程，重新完成一次最关键的步骤。",
      "用自己的话说明关键选择，以及为什么没有选其他方案。",
      "主动制造一个小变化，观察自己能否定位随之出现的问题。",
      "留下文档、代码、数据或演示，让结果以后还能被检查。",
    ],
  },
  {
    id: "ai-collaboration",
    number: "002",
    category: "learning",
    title: "我与 AI 的合适分工",
    summary: "让 AI 帮忙拆解、起草、检查与对比；自己保留判断、验证和最终责任。",
    highlight: "AI 负责加速，我负责定义什么才算正确。",
    source: "01-学习与项目实践.md",
    minutes: 3,
    updated: "2026.08",
    tags: ["AI 协作", "验证", "判断"],
    bullets: [
      "先明确任务的输入、输出和验收标准，再调用工具。",
      "把大任务拆成能够独立检查的小步骤。",
      "要求标明假设、来源与不确定性，不把流畅当成正确。",
      "关键结论必须由自己复述，并通过数据或运行结果验证。",
    ],
  },
  {
    id: "delivery-loop",
    number: "003",
    category: "learning",
    title: "从想法到作品的八步闭环",
    summary: "从问题定义、最小版本到测试与交付，完成一个有证据、能复现的项目。",
    highlight: "作品不是代码的总和，而是一次完整、可信的交付。",
    source: "01-学习与项目实践.md",
    minutes: 6,
    updated: "2026.08",
    tags: ["项目", "MVP", "证据包"],
    bullets: [
      "先写清问题、使用者、场景与价值，再决定使用什么技术。",
      "用最少功能验证最关键的一条链路。",
      "给过程留下日志、截图、决策与变更记录。",
      "最后产出说明、演示、测试和复盘，而不只是一份源码。",
    ],
  },
  {
    id: "reliable-work",
    number: "004",
    category: "action",
    title: "可靠做事的完整闭环",
    summary: "开始前对齐目标和边界，过程中暴露风险，结束时给出可验收结果。",
    highlight: "可靠不是从不犯错，而是让问题尽早可见。",
    source: "04-实习职场与职业路线.md",
    minutes: 5,
    updated: "2026.08",
    tags: ["交付", "协作", "风险同步"],
    bullets: [
      "确认优先级、截止时间、责任人以及什么才算完成。",
      "遇到阻塞时，带上已经尝试的方案和具体需要的帮助。",
      "进度发生变化就提前同步，不在最后一刻制造惊喜。",
      "交付时附上结果、验证方式与仍然存在的风险。",
    ],
  },
  {
    id: "decision-tree",
    number: "005",
    category: "action",
    title: "把选择写成决策树",
    summary: "不从热门标签出发，而是比较资源、成本、验证机会与长期复利。",
    highlight: "选择不是找到唯一正确答案，而是降低下一步的不确定性。",
    source: "00-总览与行动地图.md",
    minutes: 5,
    updated: "2026.08",
    tags: ["决策", "小步验证", "复利"],
    bullets: [
      "把所有可选路线写下来，不让它们只在脑中反复纠缠。",
      "为每条路线设计一个成本足够低的真实实验。",
      "用输出质量、外部反馈和机会数量更新判断。",
      "沉没成本不能成为继续一条路线的唯一理由。",
    ],
  },
  {
    id: "story-bank",
    number: "006",
    category: "action",
    title: "为经历建立故事索引",
    summary: "把复杂经历沉淀成可复用的故事单元：冲突、选择、行动、结果和反思。",
    highlight: "好的表达不是背答案，而是对自己的经历拥有索引。",
    source: "03-面试方法与话术.md",
    minutes: 4,
    updated: "2026.08",
    tags: ["表达", "故事", "复盘"],
    bullets: [
      "一段故事只证明一个核心能力。",
      "减少背景铺垫，增加自己真实做出的判断和行动。",
      "结果尽可能可检查，反思要能够改变下一次行动。",
    ],
  },
  {
    id: "personal-capital",
    number: "007",
    category: "growth",
    title: "积累自己的个人资本",
    summary: "把“逆袭”拆成体能、能力、作品、信任和关系这些能持续更新的资产。",
    highlight: "焦虑想要立刻换一种人生，积累只要求今天多一点证据。",
    source: "05-个人成长与关系.md",
    minutes: 5,
    updated: "2026.08",
    tags: ["个人资本", "长期主义", "周循环"],
    bullets: [
      "每周为身体、能力、作品和关系各留下一次真实投入。",
      "用月度趋势代替某一天的情绪作为判断。",
      "优先投资可迁移、可组合、可被他人验证的能力。",
    ],
  },
  {
    id: "relationship-review",
    number: "008",
    category: "growth",
    title: "每次重要接触后的五问",
    summary: "不让一次情绪决定一段关系，观察安全感、真实性、价值观、边界和双向性。",
    highlight: "关系不是转化漏斗，而是两个人的持续互选。",
    source: "05-个人成长与关系.md",
    minutes: 3,
    updated: "2026.08",
    tags: ["关系", "边界", "双向匹配"],
    bullets: [
      "我在这次互动中是否放松，并且能够保持真实？",
      "对方的行动与表达是否一致？",
      "双方处理边界、差异和冲突的方式是否成熟？",
      "关注是否双向，而不是长期由一方维持？",
    ],
  },
  {
    id: "health-log",
    number: "009",
    category: "health",
    title: "身体信号的记录方法",
    summary: "记录时间、程度、持续时长与相关因素，避免把相关性误当成因果。",
    highlight: "先记录事实，再提出假设，最后才是干预。",
    source: "06-健康护理.md",
    minutes: 4,
    updated: "2026.08",
    tags: ["健康记录", "证据边界", "变量"],
    bullets: [
      "使用稳定的记录时间与相同的衡量方式。",
      "一次只改变一个可以控制的变量。",
      "区分轻度波动、持续症状和需要及时处理的信号。",
    ],
  },
  {
    id: "energy-budget",
    number: "010",
    category: "health",
    title: "把精力当作每日预算",
    summary: "重要的事不只需要时间，还需要对应质量的注意力和恢复空间。",
    highlight: "日程安排的是时间，真正被消耗的却是能量。",
    source: "06-健康护理.md",
    minutes: 3,
    updated: "2026.08",
    tags: ["精力", "睡眠", "节奏"],
    bullets: [
      "高认知任务放在自己状态最稳定的时间段。",
      "连续透支后不要只增加计划，也要先恢复基本睡眠和活动。",
      "记录让自己恢复与消耗最快的场景，逐渐建立个人规律。",
    ],
  },
  {
    id: "position-risk",
    number: "011",
    category: "investing",
    title: "风险决定仓位",
    summary: "先确定一次决策愿意承受的损失，再根据止损距离反推仓位。",
    highlight: "仓位是风险计算的结果，不应该是情绪的起点。",
    source: "07-交易投资.md",
    minutes: 5,
    updated: "2026.08",
    tags: ["仓位", "止损", "风险"],
    bullets: [
      "区分长期投资和短线交易的目标与规则。",
      "为单次风险、总仓位和连续亏损设定上限。",
      "不使用加仓替代对原始判断的重新验证。",
    ],
  },
  {
    id: "signal-validation",
    number: "012",
    category: "investing",
    title: "把信号写成可测试规则",
    summary: "明确条件、进出场、成本、样本区间和指标，而不是只看几个成功案例。",
    highlight: "一条规则如果不能被写下来，往往也无法被验证。",
    source: "07-交易投资.md",
    minutes: 6,
    updated: "2026.08",
    tags: ["回测", "信号", "规则"],
    bullets: [
      "定义每一个变量，避免在看到结果后重新解释。",
      "把手续费、滑点和无法成交纳入结果。",
      "保留样本外数据，并记录规则的每一次修改。",
    ],
  },
  {
    id: "single-source",
    number: "013",
    category: "system",
    title: "保持单一事实来源",
    summary: "同一条知识只在一处维护，其他位置通过标签、链接与视图组合。",
    highlight: "不要在十个地方更新同一个结论。",
    source: "08-知识卡片与复习系统.md",
    minutes: 4,
    updated: "2026.08",
    tags: ["SSOT", "索引", "去重"],
    bullets: [
      "原子笔记只保留一个核心结论。",
      "主题页面负责导航和组合，不复制全部内容。",
      "修改时先更新事实源，再检查其他视图。",
    ],
  },
  {
    id: "faceted-tags",
    number: "014",
    category: "system",
    title: "用分面标签代替目录迷宫",
    summary: "以主题、场景、状态和证据等级组合视图，不让目录树无限增长。",
    highlight: "知识可以同时属于多个问题，不必被塞进唯一文件夹。",
    source: "08-知识卡片与复习系统.md",
    minutes: 4,
    updated: "2026.08",
    tags: ["标签", "检索", "视图"],
    bullets: [
      "主题标签回答“这是关于什么”。",
      "场景标签回答“什么时候会使用”。",
      "状态标签区分收集、整理、验证与归档。",
      "证据标签记录结论的可信边界。",
    ],
  },
  {
    id: "review-cadence",
    number: "015",
    category: "system",
    title: "知识库的复习节奏",
    summary: "新知识短期快速重见，成熟结论降低频率，每月清理过期和重复内容。",
    highlight: "知识库不必每天变大，但要稳定地变得更可信。",
    source: "08-知识卡片与复习系统.md",
    minutes: 5,
    updated: "2026.08",
    tags: ["间隔复习", "质量检查", "维护"],
    bullets: [
      "每周处理收集箱，只留下少量真正影响行动的结论。",
      "对新卡片安排 1、3、7、14 天的快速重见。",
      "每月检查重复、矛盾、失效链接和缺少来源的结论。",
    ],
  },
];

const categoryCount = (id) => notes.filter((note) => note.category === id).length;

const shelfItems = [
  { id: "projects", index: "01", title: "项目实验", label: "PROJECTS", copy: "做过、正在做、想验证的东西。", count: "03", accent: "blue" },
  { id: "ideas", index: "02", title: "灵感想法", label: "IDEAS", copy: "还没有被做完，但值得留下的念头。", count: "08", accent: "peach" },
  { id: "notes", index: "03", title: "知识笔记", label: "NOTES", copy: "从经历里蒸馏出来的可复用结论。", count: String(notes.length).padStart(2, "0"), accent: "lilac" },
  { id: "captures", index: "04", title: "生活收集", label: "CAPTURES", copy: "身体、关系和日常里留下的信号。", count: "12", accent: "mint" },
  { id: "review", index: "05", title: "复盘清单", label: "REVIEWS", copy: "每周重新打开，决定下一步怎么走。", count: "05", accent: "amber" },
  { id: "contact", index: "06", title: "联系我", label: "CONTACT", copy: "想交流项目、想法，或者只是打个招呼。", count: "01", accent: "rose" },
];

const collectionDetails = {
  projects: {
    eyebrow: "PROJECTS / 03",
    title: "项目实验",
    description: "我把项目当作验证想法的容器，记录问题、技术选择和交付证据。",
    items: [
      ["AI 技术文档知识岛", "RAG · Python · FastAPI", "把散落在 Confluence 和旧群聊里的技术文档接入检索问答。"],
      ["DISTILL 个人知识岛", "React · Vite · GitHub Pages", "把自己的知识、项目和想法整理成可漫游的公开空间。"],
      ["机器人小狗实践", "机器人控制 · 工程实践", "在比赛和工程实践中，记录从想法到演示的完整过程。"],
    ],
  },
  ideas: {
    eyebrow: "IDEAS / 08",
    title: "灵感想法",
    description: "不急着把每个想法都做成项目，先给它一个可以被重新发现的位置。",
    items: [
      ["AI 复盘助手", "输入经历 → 输出可验证结论", "让 AI 帮忙提炼事实、假设与下一次行动，人保留最终判断。"],
      ["证据等级卡片", "观察 / 推测 / 已验证", "给每一条知识标注可信边界，避免流畅的文字变成虚假的确定性。"],
      ["收集箱到周计划", "Capture → Distill → Do", "每周只挑出三条真正会改变行动的输入。"],
    ],
  },
  notes: {
    eyebrow: `NOTES / ${notes.length}`,
    title: "知识笔记",
    description: "从学习、关系、健康和交易里提取的工作结论，正在持续更新。",
    items: [
      ["学习与实践", "03 NOTES", "把知道变成会做，把会做变成能被验证的输出。"],
      ["成长与关系", "02 NOTES", "少一点急于证明，多一点可以长期积累的个人资本。"],
      ["知识系统", "03 NOTES", "让事实只维护一次，让视图可以被反复组合。"],
    ],
  },
  captures: {
    eyebrow: "CAPTURES / 12",
    title: "生活收集",
    description: "身体、关系、情绪和生活里的微小变化，先记录，再解释。",
    items: [
      ["身体信号", "HEALTH", "时间、程度、持续时长与相关因素。"],
      ["关系观察", "RELATIONSHIPS", "安全感、边界、真实性与双向性。"],
      ["精力预算", "RHYTHM", "重要的事不只需要时间，也需要恢复空间。"],
    ],
  },
  review: {
    eyebrow: "REVIEWS / 05",
    title: "复盘清单",
    description: "每周重新打开一次，让经验真正改变下一次行动。",
    items: [
      ["本周蒸馏", "WEEKLY", "从收集箱挑出三条会影响行动的结论。"],
      ["决策回看", "DECISION", "结果出现后，检查原来的判断是否需要更新。"],
      ["链接清理", "MAINTENANCE", "处理重复、矛盾、失效链接和无来源结论。"],
    ],
  },
  contact: {
    eyebrow: "CONTACT / 01",
    title: "联系我",
    description: "如果你也在做有趣的东西，或者想交换一条真实经验，可以写信给我。",
    items: [
      ["Google Mail", "EMAIL", "3366046376zwj@gmail.com"],
      ["交流主题", "OPEN TO", "AI 工具、个人知识系统、项目协作与长期成长。"],
      ["回复方式", "NOTE", "邮件标题写上“DISTILL”，我会更容易找到它。"],
    ],
  },
};

function Mark() {
  return (
    <svg viewBox="0 0 32 32" aria-hidden="true">
      <path d="M16 2v28M4 9l24 14M28 9 4 23" />
      <circle cx="16" cy="16" r="4" />
    </svg>
  );
}

function Arrow({ down = false }) {
  return (
    <svg className={down ? "down-arrow" : "arrow-icon"} viewBox="0 0 24 24" aria-hidden="true">
      <path d={down ? "M12 4v15m0 0 6-6m-6 6-6-6" : "M5 12h14m0 0-5-5m5 5-5 5"} />
    </svg>
  );
}

function scrollTo(id) {
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
}

function ScrollProgress() {
  const barRef = useRef(null);

  useEffect(() => {
    let frame = 0;
    const update = () => {
      frame = 0;
      const height = document.documentElement.scrollHeight - window.innerHeight;
      const progress = height > 0 ? Math.min(window.scrollY / height, 1) : 0;
      if (barRef.current) barRef.current.style.transform = `scaleX(${progress})`;
    };
    const onScroll = () => {
      if (!frame) frame = window.requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, []);

  return <div className="scroll-progress" aria-hidden="true"><span ref={barRef} /></div>;
}

const sectionMeta = {
  hero: { title: "岛屿入口", copy: "从经历里留下真正值得重复使用的东西" },
  shelf: { title: "个人收纳架", copy: "项目、想法、笔记与生活，各自归位" },
  map: { title: "知识地图", copy: "六个观察分支，连接成同一个知识系统" },
  notes: { title: "笔记档案", copy: "搜索、筛选，再打开一条可执行的结论" },
  method: { title: "蒸馏方法", copy: "收集、压缩、连接，然后回到行动" },
  about: { title: "关于这座岛", copy: "保持更新，也允许过去的结论被修正" },
};

function Nav({ onSearch, activeSection }) {
  const items = [
    ["收纳架", "shelf"],
    ["知识地图", "map"],
    ["全部笔记", "notes"],
    ["蒸馏方法", "method"],
    ["关于", "about"],
  ];
  const meta = sectionMeta[activeSection] ?? sectionMeta.hero;

  return (
    <header className={`floating-nav ${activeSection !== "hero" ? "is-expanded" : ""}`}>
      <div className="nav-primary">
        <button className="nav-brand" onClick={() => scrollTo("hero")} aria-label="返回首页">
          <Mark />
          <strong>DISTILL</strong>
        </button>
        <span className="nav-separator" />
        <nav aria-label="主导航">
          {items.map(([label, id]) => (
            <button
              className={activeSection === id ? "active" : ""}
              key={id}
              onClick={() => scrollTo(id)}
            >
              {label}
            </button>
          ))}
        </nav>
        <span className="nav-separator last" />
        <button className="nav-search" onClick={onSearch} aria-label="搜索笔记">
          <svg viewBox="0 0 24 24" aria-hidden="true">
            <circle cx="11" cy="11" r="6" />
            <path d="m16 16 4 4" />
          </svg>
        </button>
      </div>
      <div className="nav-context" aria-hidden={activeSection === "hero"}>
        <div className="nav-context-copy" key={activeSection}>
          <strong>{meta.title}</strong>
          <span>{meta.copy}</span>
        </div>
      </div>
    </header>
  );
}

function Hero() {
  const islandRef = useRef(null);

  const moveLight = (event) => {
    const bounds = event.currentTarget.getBoundingClientRect();
    const x = (event.clientX - bounds.left) / bounds.width - 0.5;
    const y = (event.clientY - bounds.top) / bounds.height - 0.5;
    islandRef.current?.style.setProperty("--mouse-x", `${event.clientX - bounds.left}px`);
    islandRef.current?.style.setProperty("--mouse-y", `${event.clientY - bounds.top}px`);
    islandRef.current?.style.setProperty("--tilt-x", `${y * -5}deg`);
    islandRef.current?.style.setProperty("--tilt-y", `${x * 7}deg`);
  };

  const resetLight = () => {
    islandRef.current?.style.setProperty("--tilt-x", "0deg");
    islandRef.current?.style.setProperty("--tilt-y", "0deg");
  };

  useEffect(() => {
    let frame = 0;
    const update = () => {
      frame = 0;
      const progress = Math.min(Math.max(window.scrollY / (window.innerHeight * 0.85), 0), 1);
      islandRef.current?.style.setProperty("--hero-lift", `${progress * 34}px`);
      islandRef.current?.style.setProperty("--hero-scale", String(1 - progress * 0.11));
      islandRef.current?.style.setProperty("--hero-opacity", String(1 - progress * 0.48));
    };
    const onScroll = () => {
      if (!frame) frame = window.requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <section className="hero" id="hero">
      <div className="hero-glow" />
      <div className="hero-island-shell" ref={islandRef} onPointerMove={moveLight} onPointerLeave={resetLight}>
        <div className="hero-halo" aria-hidden="true" />
        <div className="hero-island">
          <div className="hero-noise" />
          <div className="hero-cursor" aria-hidden="true" />
          <span className="hero-kicker">PERSONAL KNOWLEDGE ISLAND</span>
          <h1>DISTILL</h1>
          <p>蒸馏我自己 —— 把经历变成可以检索、验证和重复使用的知识。</p>
          <div className="hero-actions">
            <button className="light-button" onClick={() => scrollTo("shelf")}>
              打开收纳架 <Arrow />
            </button>
            <button className="dark-button" onClick={() => scrollTo("method")}>查看系统</button>
          </div>
          <div className="hero-orbit orbit-a">学习闭环</div>
          <div className="hero-orbit orbit-b">证据边界</div>
          <div className="hero-orbit orbit-c">风险与决策</div>
        </div>
      </div>
      <button className="scroll-cue" onClick={() => scrollTo("map")}>
        <span>向下漫游</span>
        <Arrow down />
      </button>
    </section>
  );
}

function ContentShelf({ onOpen, isActive }) {
  const left = shelfItems.slice(0, 3);
  const right = shelfItems.slice(3);
  const renderCard = (item) => (
    <button key={item.id} className={`shelf-card ${item.accent}`} onClick={() => onOpen(item.id)}>
      <div className="shelf-card-top"><span>{item.index}</span><small>{item.label}</small></div>
      <div className="shelf-card-copy"><h3>{item.title}</h3><p>{item.copy}</p></div>
      <div className="shelf-card-bottom"><span>{item.count} ITEMS</span><Arrow /></div>
    </button>
  );

  return (
    <section className="shelf-section" id="shelf" data-active={isActive}>
      <SectionTitle
        eyebrow="PERSONAL STORAGE"
        title="把东西放进各自的盒子"
        copy="项目、想法、笔记和生活，不需要混成一个巨大的目录。点击一个盒子，打开它的内容。"
        side={<span>06 COLLECTIONS / ONE ISLAND</span>}
      />
      <div className="shelf-layout">
        <div className="shelf-column">{left.map(renderCard)}</div>
        <div className="shelf-core">
          <span>MY ISLAND</span>
          <strong>收纳<br />发生处</strong>
          <i />
          <small>继续探索</small>
        </div>
        <div className="shelf-column">{right.map(renderCard)}</div>
      </div>
    </section>
  );
}

function SectionTitle({ eyebrow, title, copy, side }) {
  return (
    <div className="section-title">
      <div>
        <span>{eyebrow}</span>
        <h2>{title}</h2>
      </div>
      <p>{copy}</p>
      {side && <div className="title-side">{side}</div>}
    </div>
  );
}

function KnowledgeMap({ onSelect, isActive }) {
  const left = categories.slice(0, 3);
  const right = categories.slice(3);
  const renderCategory = (category, index) => (
    <button
      key={category.id}
      className={`map-card ${category.accent}`}
      style={{ "--stage-delay": `${index * 85}ms` }}
      onClick={() => onSelect(category.id)}
    >
      <span className="map-index">{category.index}</span>
      <div className="map-symbol"><i /><i /><i /></div>
      <div className="map-copy">
        <h3>{category.label}</h3>
        <p>{category.description}</p>
      </div>
      <div className="map-meta">
        <span>{categoryCount(category.id)} NOTES</span>
        <Arrow />
      </div>
    </button>
  );

  return (
    <section className="section map-section" id="map" data-active={isActive}>
      <SectionTitle
        eyebrow="KNOWLEDGE BRANCHES"
        title="六个分支，同一个我"
        copy="不把知识锁死在文件夹里。每个分支都是一个观察视角，也可以与其他问题相连。"
        side={<span>06 BRANCHES / {notes.length} NOTES</span>}
      />
      <div className="map-stage">
        <div className="map-rail map-rail-left">{left.map(renderCategory)}</div>
        <div className="map-island" aria-hidden="true">
          <span>06</span>
          <i />
          <small>BRANCHES</small>
        </div>
        <div className="map-rail map-rail-right">{right.map((category, index) => renderCategory(category, index + 3))}</div>
      </div>
    </section>
  );
}

function NoteCard({ note, onOpen }) {
  const category = categories.find((item) => item.id === note.category);
  return (
    <button className="note-card" onClick={() => onOpen(note)}>
      <div className="note-topline"><span>{note.number}</span><span>{category?.label}</span></div>
      <h3>{note.title}</h3>
      <p>{note.summary}</p>
      <div className="note-tags">
        {note.tags.slice(0, 3).map((tag) => <span key={tag}>#{tag}</span>)}
      </div>
      <div className="note-footer"><span>{note.minutes} MIN READ</span><Arrow /></div>
    </button>
  );
}

function NotesExplorer({ selectedCategory, setSelectedCategory, onOpen, searchRef }) {
  const [query, setQuery] = useState("");
  const filtered = useMemo(() => {
    const normalized = query.trim().toLowerCase();
    return notes.filter((note) => {
      const inCategory = selectedCategory === "all" || note.category === selectedCategory;
      const haystack = [note.title, note.summary, note.highlight, ...note.tags, ...note.bullets].join(" ").toLowerCase();
      return inCategory && (!normalized || haystack.includes(normalized));
    });
  }, [query, selectedCategory]);

  return (
    <section className="section notes-section" id="notes">
      <SectionTitle
        eyebrow="NOTE ARCHIVE"
        title="搜索我的思考"
        copy="这些不是标准答案，而是一组会随着新证据继续更新的工作结论。"
      />
      <div className="explorer-bar">
        <label className="search-box">
          <svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="11" cy="11" r="6" /><path d="m16 16 4 4" /></svg>
          <input
            ref={searchRef}
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="搜索概念、问题或标签…"
            aria-label="搜索知识笔记"
          />
          <kbd>/</kbd>
        </label>
        <span className="result-count">{String(filtered.length).padStart(2, "0")} RESULTS</span>
      </div>
      <div className="filter-row">
        <button className={selectedCategory === "all" ? "active" : ""} onClick={() => setSelectedCategory("all")}>全部</button>
        {categories.map((category) => (
          <button key={category.id} className={selectedCategory === category.id ? "active" : ""} onClick={() => setSelectedCategory(category.id)}>
            {category.label}
          </button>
        ))}
      </div>
      <div className="notes-grid">
        {filtered.map((note, index) => (
          <div className="note-card-shell" key={note.id} style={{ "--reveal-delay": `${(index % 6) * 55}ms` }}>
            <NoteCard note={note} onOpen={onOpen} />
          </div>
        ))}
      </div>
      {filtered.length === 0 && (
        <div className="empty-results">
          <span>NO MATCH</span>
          <h3>还没有与这个问题相连的笔记。</h3>
          <button onClick={() => { setQuery(""); setSelectedCategory("all"); }}>清除筛选</button>
        </div>
      )}
    </section>
  );
}

function Method() {
  const steps = [
    { index: "01", en: "CAPTURE", title: "收集", copy: "记下问题、冲突和突然出现的线索。" },
    { index: "02", en: "DISTILL", title: "蒸馏", copy: "去掉重复与情绪，留下可验证的结论。" },
    { index: "03", en: "CONNECT", title: "连接", copy: "用标签和索引把结论放回真实场景。" },
    { index: "04", en: "REVISIT", title: "重访", copy: "在行动时重新打开，再用结果更新它。" },
  ];

  return (
    <section className="method-section" id="method">
      <div className="method-window">
        <div className="window-bar">
          <div className="window-dots"><i /><i /><i /></div>
          <span>~/distill/system</span>
          <span>100%</span>
        </div>
        <div className="method-inner">
          <div className="method-intro">
            <span>THE DISTILLATION LOOP</span>
            <h2>从经历到知识，<br />只差一次蒸馏。</h2>
            <p>收集不是终点。只有当一段经历被压缩、连接，并重新用于行动时，它才成为我的知识。</p>
          </div>
          <div className="method-steps">
            {steps.map((step) => (
              <article key={step.index}>
                <div><span>{step.index}</span><small>{step.en}</small></div>
                <h3>{step.title}</h3>
                <p>{step.copy}</p>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function NowPanel() {
  return (
    <section className="section now-section">
      <SectionTitle
        eyebrow="CURRENT RHYTHM"
        title="此刻，我如何维护这座岛"
        copy="不追求日更，只保留一个能长期运行的节奏。"
      />
      <div className="now-grid">
        <article className="now-large">
          <div className="now-badge"><span /> LIVE SYSTEM</div>
          <h3>本周蒸馏清单</h3>
          <ul>
            <li><span>01</span><p>从收集箱挑出 3 条真正会影响行动的结论。</p><i>进行中</i></li>
            <li><span>02</span><p>为新结论补齐来源、假设与证据等级。</p><i>待处理</i></li>
            <li><span>03</span><p>选择一次决策，检查结果是否改变原来的判断。</p><i>待处理</i></li>
          </ul>
        </article>
        <article className="metric-card black"><span>KNOWLEDGE NOTES</span><strong>{notes.length}</strong><p>经过整理的核心卡片</p></article>
        <article className="metric-card soft"><span>REVIEW CADENCE</span><strong>7D</strong><p>每周一次处理与连接</p></article>
      </div>
    </section>
  );
}

function About() {
  return (
    <section className="about-section" id="about">
      <div className="about-island">
        <span>ABOUT THIS ISLAND</span>
        <h2>它不是简历，<br />也不是标准答案。</h2>
        <p>这里保留的是我目前能够解释、验证和重复使用的知识。每一个结论都可以在新经验出现后被修正，而这正是它存在的意义。</p>
        <a className="about-email" href="mailto:3366046376zwj@gmail.com">3366046376zwj@gmail.com</a>
        <button onClick={() => scrollTo("hero")}>回到岛屿入口 <Arrow /></button>
      </div>
    </section>
  );
}

function CollectionDialog({ collectionId, onClose }) {
  const closeButtonRef = useRef(null);
  const collection = collectionId ? collectionDetails[collectionId] : null;

  useEffect(() => {
    if (!collection) return undefined;
    const closeOnEscape = (event) => event.key === "Escape" && onClose();
    window.addEventListener("keydown", closeOnEscape);
    document.body.classList.add("dialog-open");
    closeButtonRef.current?.focus();
    return () => {
      window.removeEventListener("keydown", closeOnEscape);
      document.body.classList.remove("dialog-open");
    };
  }, [collection, onClose]);

  if (!collection) return null;

  return (
    <div className="dialog-backdrop" role="presentation" onMouseDown={onClose}>
      <article className="collection-dialog" role="dialog" aria-modal="true" aria-labelledby="collection-title" onMouseDown={(event) => event.stopPropagation()}>
        <div className="dialog-header">
          <div><span>{collection.eyebrow}</span><small>PERSONAL STORAGE</small></div>
          <button ref={closeButtonRef} onClick={onClose} aria-label="关闭收纳盒">×</button>
        </div>
        <div className="collection-body">
          <h2 id="collection-title">{collection.title}</h2>
          <p>{collection.description}</p>
          <div className="collection-list">
            {collection.items.map(([title, meta, copy]) => (
              <article key={title}>
                <div><h3>{title}</h3><span>{meta}</span></div>
                <p>{copy}</p>
              </article>
            ))}
          </div>
          {collectionId === "contact" && (
            <a className="collection-mail" href="mailto:3366046376zwj@gmail.com">写信给我 <Arrow /></a>
          )}
        </div>
      </article>
    </div>
  );
}

function NoteDialog({ note, onClose }) {
  const closeButtonRef = useRef(null);

  useEffect(() => {
    if (!note) return undefined;
    const closeOnEscape = (event) => event.key === "Escape" && onClose();
    window.addEventListener("keydown", closeOnEscape);
    document.body.classList.add("dialog-open");
    closeButtonRef.current?.focus();
    return () => {
      window.removeEventListener("keydown", closeOnEscape);
      document.body.classList.remove("dialog-open");
    };
  }, [note, onClose]);

  if (!note) return null;
  const category = categories.find((item) => item.id === note.category);

  return (
    <div className="dialog-backdrop" role="presentation" onMouseDown={onClose}>
      <article className="note-dialog" role="dialog" aria-modal="true" aria-labelledby="dialog-title" onMouseDown={(event) => event.stopPropagation()}>
        <div className="dialog-header">
          <div><span>{note.number} / {category?.label}</span><small>{note.updated} · {note.minutes} MIN READ</small></div>
          <button ref={closeButtonRef} onClick={onClose} aria-label="关闭笔记">×</button>
        </div>
        <div className="dialog-body">
          <h2 id="dialog-title">{note.title}</h2>
          <p className="dialog-summary">{note.summary}</p>
          <blockquote>{note.highlight}</blockquote>
          <h3>ACTIONABLE NOTES</h3>
          <ol>{note.bullets.map((bullet, index) => <li key={bullet}><span>{String(index + 1).padStart(2, "0")}</span><p>{bullet}</p></li>)}</ol>
          <div className="dialog-tags">{note.tags.map((tag) => <span key={tag}>#{tag}</span>)}</div>
          <div className="dialog-source"><span>SOURCE</span><code>{note.source}</code></div>
        </div>
      </article>
    </div>
  );
}

function Footer() {
  return (
    <footer>
      <div className="footer-brand"><Mark /><strong>DISTILL</strong></div>
      <p><a href="mailto:3366046376zwj@gmail.com">3366046376zwj@gmail.com</a></p>
      <span>持续更新，永不完成。</span>
    </footer>
  );
}

export default function App() {
  const [activeSection, setActiveSection] = useState("hero");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [activeNote, setActiveNote] = useState(null);
  const [activeCollection, setActiveCollection] = useState(null);
  const searchRef = useRef(null);

  const focusSearch = () => {
    scrollTo("notes");
    window.setTimeout(() => searchRef.current?.focus(), 450);
  };

  useEffect(() => {
    const handler = (event) => {
      if (event.key === "/" && !["INPUT", "TEXTAREA"].includes(document.activeElement?.tagName)) {
        event.preventDefault();
        focusSearch();
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, []);

  useEffect(() => {
    const ids = ["hero", "shelf", "map", "notes", "method", "about"];
    let frame = 0;
    const updateSection = () => {
      frame = 0;
      const probe = window.innerHeight * 0.38;
      let current = "hero";
      ids.forEach((id) => {
        const element = document.getElementById(id);
        if (element && element.getBoundingClientRect().top <= probe) current = id;
      });
      setActiveSection((previous) => previous === current ? previous : current);
    };
    const onScroll = () => {
      if (!frame) frame = window.requestAnimationFrame(updateSection);
    };
    updateSection();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, []);

  useEffect(() => {
    const selector = [
      ".section-title",
      ".explorer-bar",
      ".filter-row",
      ".note-card-shell",
      ".method-window",
      ".now-large",
      ".metric-card",
      ".about-island",
      "footer",
    ].join(",");

    let frame = 0;
    const revealVisible = () => {
      frame = 0;
      document.querySelectorAll(selector).forEach((element) => {
        if (!element.dataset.revealBound) element.dataset.revealBound = "true";
        if (element.classList.contains("is-visible")) return;
        const bounds = element.getBoundingClientRect();
        if (bounds.top < window.innerHeight * 0.9 && bounds.bottom > 0) {
          element.classList.add("is-visible");
        }
      });
    };
    const scheduleReveal = () => {
      if (!frame) frame = window.requestAnimationFrame(revealVisible);
    };

    revealVisible();
    window.addEventListener("scroll", scheduleReveal, { passive: true });
    window.addEventListener("resize", scheduleReveal);
    return () => {
      window.removeEventListener("scroll", scheduleReveal);
      window.removeEventListener("resize", scheduleReveal);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, []);

  const selectBranch = (category) => {
    setSelectedCategory(category);
    scrollTo("notes");
  };

  return (
    <>
      <ScrollProgress />
      <Nav onSearch={focusSearch} activeSection={activeSection} />
      <main>
        <Hero />
        <ContentShelf onOpen={setActiveCollection} isActive={activeSection === "shelf"} />
        <KnowledgeMap onSelect={selectBranch} isActive={activeSection === "map"} />
        <NotesExplorer selectedCategory={selectedCategory} setSelectedCategory={setSelectedCategory} onOpen={setActiveNote} searchRef={searchRef} />
        <Method />
        <NowPanel />
        <About />
      </main>
      <Footer />
      <CollectionDialog collectionId={activeCollection} onClose={() => setActiveCollection(null)} />
      <NoteDialog note={activeNote} onClose={() => setActiveNote(null)} />
    </>
  );
}
