import type { Category, Question } from "@/lib/types";

export const categories: Category[] = [
  {
    id: "school-leadership",
    title: "School Leadership",
    description:
      "Review questions about leadership styles, management, and school governance",
    questionCount: 25,
  },
  {
    id: "instructional-leadership",
    title: "Instructional Leadership",
    description:
      "Questions on curriculum implementation, teaching methodologies, and assessment",
    questionCount: 30,
  },
  {
    id: "personal-and-professional-development",
    title: "Personal & Professional Development",
    description:
      "Topics on continuous improvement, ethics, and professional growth",
    questionCount: 20,
  },
  {
    id: "human-resource-management",
    title: "Human Resource Management",
    description:
      "Questions about staff development, conflict resolution, and team building",
    questionCount: 15,
  },
];

export const questions: Question[] = [
  // School Leadership Questions
  {
    id: "sl-1",
    categoryId: "school-leadership",
    question:
      "Which leadership style is characterized by involving team members in the decision-making process?",
    options: [
      { id: "a", text: "Autocratic leadership" },
      { id: "b", text: "Democratic leadership" },
      { id: "c", text: "Laissez-faire leadership" },
      { id: "d", text: "Transactional leadership" },
    ],
    correctAnswer: "b",
    explanation:
      "Democratic leadership involves team members in the decision-making process. This style values input from team members and promotes collaboration, which can lead to higher engagement and better decisions through diverse perspectives.",
    source: {
      name: "Educational Leadership: Key Concepts and Skills",
      url: "https://www.edutopia.org/article/leadership-styles-education",
    },
  },
  {
    id: "sl-2",
    categoryId: "school-leadership",
    question: "What is the primary purpose of a school improvement plan?",
    options: [
      { id: "a", text: "To satisfy regulatory requirements" },
      { id: "b", text: "To document teacher performance" },
      {
        id: "c",
        text: "To guide strategic actions for enhancing student outcomes",
      },
      { id: "d", text: "To allocate budget resources" },
    ],
    correctAnswer: "c",
    explanation:
      "The primary purpose of a school improvement plan is to guide strategic actions for enhancing student outcomes. It identifies areas for improvement, sets measurable goals, and outlines specific strategies to achieve those goals, all focused on improving student learning and achievement.",
    source: {
      name: "School Improvement Planning: A Handbook for Educational Leaders",
      url: "https://www.ascd.org/publications/educational-leadership/school-improvement",
    },
  },
  {
    id: "sl-3",
    categoryId: "school-leadership",
    question:
      "Which of the following best describes distributed leadership in a school context?",
    options: [
      { id: "a", text: "The principal makes all decisions independently" },
      {
        id: "b",
        text: "Leadership responsibilities are shared among various stakeholders",
      },
      {
        id: "c",
        text: "Teachers are solely responsible for classroom management",
      },
      { id: "d", text: "External consultants manage school operations" },
    ],
    correctAnswer: "b",
    explanation:
      "Distributed leadership in a school context involves sharing leadership responsibilities among various stakeholders, including teachers, staff, students, and community members. This approach recognizes that leadership is not confined to formal positions and leverages the expertise and perspectives of multiple individuals.",
    source: {
      name: "Distributed Leadership in Practice",
      url: "https://www.tandfonline.com/doi/full/10.1080/13603124.2018.1463460",
    },
  },
  {
    id: "sl-4",
    categoryId: "school-leadership",
    question:
      "What is a key characteristic of transformational leadership in education?",
    options: [
      {
        id: "a",
        text: "Focusing primarily on maintaining existing procedures",
      },
      {
        id: "b",
        text: "Emphasizing rewards and punishments to motivate staff",
      },
      {
        id: "c",
        text: "Inspiring and motivating staff to achieve a shared vision",
      },
      {
        id: "d",
        text: "Avoiding direct involvement in teaching and learning processes",
      },
    ],
    correctAnswer: "c",
    explanation:
      "A key characteristic of transformational leadership in education is inspiring and motivating staff to achieve a shared vision. Transformational leaders inspire change through their vision, build trust, encourage innovation, and develop the leadership capacity of others.",
    source: {
      name: "Transformational Leadership in Education",
      url: "https://www.researchgate.net/publication/321837514_Transformational_Leadership_in_Education",
    },
  },
  {
    id: "sl-5",
    categoryId: "school-leadership",
    question:
      "Which approach to conflict resolution focuses on finding a solution where all parties gain something of value?",
    options: [
      { id: "a", text: "Avoidance" },
      { id: "b", text: "Compromise" },
      { id: "c", text: "Win-lose negotiation" },
      { id: "d", text: "Win-win negotiation" },
    ],
    correctAnswer: "d",
    explanation:
      "Win-win negotiation focuses on finding a solution where all parties gain something of value. This approach to conflict resolution seeks to understand the underlying interests of all parties and develop creative solutions that address these interests, resulting in mutual benefit.",
    source: {
      name: "Conflict Resolution in Educational Settings",
      url: "https://www.pon.harvard.edu/daily/conflict-resolution/conflict-resolution-in-education",
    },
  },

  // Instructional Leadership Questions
  {
    id: "il-1",
    categoryId: "instructional-leadership",
    question:
      "Which of the following best describes the purpose of formative assessment?",
    options: [
      { id: "a", text: "To assign final grades at the end of a term" },
      {
        id: "b",
        text: "To monitor student learning and provide ongoing feedback",
      },
      {
        id: "c",
        text: "To compare student performance across different schools",
      },
      {
        id: "d",
        text: "To determine student placement in specialized programs",
      },
    ],
    correctAnswer: "b",
    explanation:
      "The purpose of formative assessment is to monitor student learning and provide ongoing feedback. This type of assessment helps teachers identify where students are struggling and adjust their teaching accordingly, while also helping students identify their strengths and weaknesses.",
    source: {
      name: "Assessment for Learning: Formative Assessment",
      url: "https://www.edutopia.org/article/formative-assessment-learning",
    },
  },
  {
    id: "il-2",
    categoryId: "instructional-leadership",
    question: "What is the primary goal of differentiated instruction?",
    options: [
      {
        id: "a",
        text: "To standardize teaching methods across all classrooms",
      },
      { id: "b", text: "To reduce the workload for teachers" },
      { id: "c", text: "To address the diverse learning needs of students" },
      {
        id: "d",
        text: "To prepare students exclusively for standardized tests",
      },
    ],
    correctAnswer: "c",
    explanation:
      "The primary goal of differentiated instruction is to address the diverse learning needs of students. This approach recognizes that students have different learning styles, readiness levels, and interests, and adapts teaching methods, content, and assessment accordingly to maximize each student's learning potential.",
    source: {
      name: "Differentiated Instruction: Theory and Practice",
      url: "https://www.ascd.org/topics/differentiated-instruction",
    },
  },
  {
    id: "il-3",
    categoryId: "instructional-leadership",
    question:
      "Which instructional strategy involves students working together to solve problems or complete tasks?",
    options: [
      { id: "a", text: "Direct instruction" },
      { id: "b", text: "Independent study" },
      { id: "c", text: "Cooperative learning" },
      { id: "d", text: "Lecture-based teaching" },
    ],
    correctAnswer: "c",
    explanation:
      "Cooperative learning involves students working together to solve problems or complete tasks. This instructional strategy promotes collaboration, communication, and social skills while allowing students to learn from one another and develop a deeper understanding of the material through discussion and shared responsibility.",
    source: {
      name: "Cooperative Learning: Research and Practice",
      url: "https://www.edutopia.org/article/cooperative-learning-research",
    },
  },
  {
    id: "il-4",
    categoryId: "instructional-leadership",
    question:
      "What is the main purpose of a professional learning community (PLC) in a school?",
    options: [
      {
        id: "a",
        text: "To evaluate teacher performance for administrative purposes",
      },
      {
        id: "b",
        text: "To collaborate on improving teaching practices and student learning",
      },
      { id: "c", text: "To organize social events for school staff" },
      { id: "d", text: "To manage school budgets and resources" },
    ],
    correctAnswer: "b",
    explanation:
      "The main purpose of a professional learning community (PLC) in a school is to collaborate on improving teaching practices and student learning. PLCs bring educators together regularly to share expertise, analyze student data, reflect on instructional practices, and work collectively to improve outcomes for all students.",
    source: {
      name: "Professional Learning Communities: Research and Practice",
      url: "https://www.ascd.org/topics/professional-learning-communities",
    },
  },
  {
    id: "il-5",
    categoryId: "instructional-leadership",
    question:
      "Which of the following best describes the concept of 'scaffolding' in education?",
    options: [
      { id: "a", text: "Grouping students by ability level" },
      {
        id: "b",
        text: "Providing temporary support that is gradually removed as students develop skills",
      },
      { id: "c", text: "Using technology as the primary teaching tool" },
      { id: "d", text: "Assigning homework to reinforce classroom learning" },
    ],
    correctAnswer: "b",
    explanation:
      "Scaffolding in education refers to providing temporary support that is gradually removed as students develop skills. This instructional technique involves giving students the assistance they need to complete tasks they couldn't do independently, then gradually reducing that support as they become more proficient.",
    source: {
      name: "Scaffolding Instruction for Success",
      url: "https://www.edutopia.org/article/scaffolded-learning-instruction",
    },
  },

  // Personal and Professional Development Questions
  {
    id: "ppd-1",
    categoryId: "personal-and-professional-development",
    question:
      "Which of the following best describes reflective practice for educators?",
    options: [
      {
        id: "a",
        text: "Following prescribed teaching methods without deviation",
      },
      {
        id: "b",
        text: "Critically examining one's teaching experiences to improve practice",
      },
      { id: "c", text: "Implementing only research-based strategies" },
      { id: "d", text: "Focusing solely on student test scores" },
    ],
    correctAnswer: "b",
    explanation:
      "Reflective practice for educators involves critically examining one's teaching experiences to improve practice. This ongoing process of self-assessment and analysis helps educators identify strengths and areas for growth, consider alternative approaches, and continuously refine their teaching methods.",
    source: {
      name: "Reflective Practice in Education",
      url: "https://www.tandfonline.com/doi/full/10.1080/14623943.2019.1575195",
    },
  },
  {
    id: "ppd-2",
    categoryId: "personal-and-professional-development",
    question:
      "What is a key characteristic of a growth mindset in educational leadership?",
    options: [
      { id: "a", text: "Believing that leadership abilities are fixed traits" },
      {
        id: "b",
        text: "Avoiding challenges to maintain a positive reputation",
      },
      {
        id: "c",
        text: "Viewing challenges as opportunities for growth and learning",
      },
      {
        id: "d",
        text: "Focusing exclusively on innate talents rather than developed skills",
      },
    ],
    correctAnswer: "c",
    explanation:
      "A key characteristic of a growth mindset in educational leadership is viewing challenges as opportunities for growth and learning. Leaders with a growth mindset believe that abilities can be developed through dedication and hard work, embrace challenges, persist in the face of setbacks, and learn from criticism.",
    source: {
      name: "Growth Mindset in Educational Leadership",
      url: "https://www.mindsetworks.com/science/Impact-Leadership",
    },
  },
  {
    id: "ppd-3",
    categoryId: "personal-and-professional-development",
    question:
      "Which ethical principle emphasizes treating all students fairly and equitably?",
    options: [
      { id: "a", text: "Confidentiality" },
      { id: "b", text: "Justice" },
      { id: "c", text: "Autonomy" },
      { id: "d", text: "Beneficence" },
    ],
    correctAnswer: "b",
    explanation:
      "The ethical principle of justice emphasizes treating all students fairly and equitably. This principle requires educational leaders to ensure that resources, opportunities, and attention are distributed fairly among all students, with consideration for individual needs and circumstances.",
    source: {
      name: "Ethics in Educational Leadership",
      url: "https://www.tandfonline.com/doi/abs/10.1080/15700763.2016.1181188",
    },
  },
  {
    id: "ppd-4",
    categoryId: "personal-and-professional-development",
    question:
      "What is the primary purpose of a professional development plan for school leaders?",
    options: [
      { id: "a", text: "To fulfill certification requirements" },
      { id: "b", text: "To document past achievements" },
      {
        id: "c",
        text: "To guide intentional growth in leadership competencies",
      },
      { id: "d", text: "To compare performance with other school leaders" },
    ],
    correctAnswer: "c",
    explanation:
      "The primary purpose of a professional development plan for school leaders is to guide intentional growth in leadership competencies. Such a plan identifies specific areas for improvement, sets measurable goals, outlines strategies and resources for development, and establishes timelines for progress monitoring.",
    source: {
      name: "Professional Development Planning for Educational Leaders",
      url: "https://www.ascd.org/publications/educational-leadership/professional-development",
    },
  },
  {
    id: "ppd-5",
    categoryId: "personal-and-professional-development",
    question:
      "Which approach to professional learning emphasizes job-embedded, collaborative learning?",
    options: [
      { id: "a", text: "One-time workshops" },
      { id: "b", text: "Individual online courses" },
      { id: "c", text: "Professional learning communities" },
      { id: "d", text: "Conference attendance" },
    ],
    correctAnswer: "c",
    explanation:
      "Professional learning communities (PLCs) emphasize job-embedded, collaborative learning. This approach involves educators working together regularly in their school context to improve their practice through shared inquiry, collective learning, and mutual accountability, making it more relevant and immediately applicable than one-time external training.",
    source: {
      name: "Effective Professional Development Models",
      url: "https://learningforward.org/standards-for-professional-learning/",
    },
  },

  // Human Resource Management Questions
  {
    id: "hrm-1",
    categoryId: "human-resource-management",
    question:
      "Which of the following is a key component of effective teacher induction programs?",
    options: [
      { id: "a", text: "Minimal supervision to encourage independence" },
      { id: "b", text: "Mentoring from experienced teachers" },
      { id: "c", text: "Immediate full teaching responsibilities" },
      {
        id: "d",
        text: "Isolation from other staff to focus on classroom management",
      },
    ],
    correctAnswer: "b",
    explanation:
      "Mentoring from experienced teachers is a key component of effective teacher induction programs. This relationship provides new teachers with guidance, support, and feedback from someone who understands the challenges they face, helping them develop their skills and navigate the complexities of their new role.",
    source: {
      name: "Teacher Induction Programs: Best Practices",
      url: "https://www.newteachercenter.org/approach/teacher-induction/",
    },
  },
  {
    id: "hrm-2",
    categoryId: "human-resource-management",
    question: "What is the primary purpose of a teacher evaluation system?",
    options: [
      { id: "a", text: "To identify teachers for dismissal" },
      { id: "b", text: "To fulfill administrative requirements" },
      {
        id: "c",
        text: "To promote professional growth and improve instruction",
      },
      { id: "d", text: "To determine salary increases" },
    ],
    correctAnswer: "c",
    explanation:
      "The primary purpose of a teacher evaluation system is to promote professional growth and improve instruction. While evaluation may inform personnel decisions, its main goal should be to provide teachers with meaningful feedback and support to enhance their effectiveness and ultimately improve student learning.",
    source: {
      name: "Teacher Evaluation: Purpose and Best Practices",
      url: "https://www.rand.org/topics/teacher-evaluation.html",
    },
  },
  {
    id: "hrm-3",
    categoryId: "human-resource-management",
    question:
      "Which approach to conflict resolution involves a neutral third party helping disputants reach a mutually acceptable solution?",
    options: [
      { id: "a", text: "Arbitration" },
      { id: "b", text: "Mediation" },
      { id: "c", text: "Litigation" },
      { id: "d", text: "Avoidance" },
    ],
    correctAnswer: "b",
    explanation:
      "Mediation involves a neutral third party helping disputants reach a mutually acceptable solution. Unlike arbitration, where the third party makes a binding decision, mediation facilitates communication between the parties to help them find their own resolution to the conflict.",
    source: {
      name: "Conflict Resolution in Educational Settings",
      url: "https://www.mediate.com/education/index.cfm",
    },
  },
  {
    id: "hrm-4",
    categoryId: "human-resource-management",
    question:
      "What is a key characteristic of effective delegation by school leaders?",
    options: [
      {
        id: "a",
        text: "Assigning tasks without providing necessary resources",
      },
      {
        id: "b",
        text: "Maintaining tight control over all aspects of delegated tasks",
      },
      {
        id: "c",
        text: "Matching tasks to individuals' skills and development needs",
      },
      { id: "d", text: "Delegating only routine, administrative tasks" },
    ],
    correctAnswer: "c",
    explanation:
      "A key characteristic of effective delegation by school leaders is matching tasks to individuals' skills and development needs. Effective delegation considers both the requirements of the task and the capabilities and growth opportunities for the person to whom it's delegated, providing appropriate authority and support.",
    source: {
      name: "Effective Delegation in Educational Leadership",
      url: "https://www.ascd.org/publications/educational-leadership/delegation",
    },
  },
  {
    id: "hrm-5",
    categoryId: "human-resource-management",
    question:
      "Which of the following best describes distributed leadership in a school setting?",
    options: [
      { id: "a", text: "The principal makes all decisions independently" },
      {
        id: "b",
        text: "Leadership responsibilities are shared among various stakeholders",
      },
      {
        id: "c",
        text: "Department heads have complete autonomy over their areas",
      },
      {
        id: "d",
        text: "External consultants direct school improvement efforts",
      },
    ],
    correctAnswer: "b",
    explanation:
      "Distributed leadership in a school setting involves sharing leadership responsibilities among various stakeholders. This approach recognizes that leadership is not confined to formal positions and leverages the expertise, perspectives, and capabilities of multiple individuals throughout the school community.",
    source: {
      name: "Distributed Leadership in Schools",
      url: "https://www.educationleadership-digital.com/distributed-leadership",
    },
  },
];
