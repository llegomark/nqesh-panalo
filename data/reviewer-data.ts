// Dummy data for reviewer questions

import type { Category, Question } from "@/lib/types";

// Updated category counts reflect the actual questions present after adding 50 new ones.
export const categories: Category[] = [
  {
    id: "school-leadership",
    title: "School Leadership",
    description:
      "Review questions about leadership styles, management, and school governance",
    questionCount: 20, // 5 original + 15 new
  },
  {
    id: "instructional-leadership",
    title: "Instructional Leadership",
    description:
      "Questions on curriculum implementation, teaching methodologies, and assessment",
    questionCount: 20, // 5 original + 15 new
  },
  {
    id: "personal-and-professional-development",
    title: "Personal & Professional Development",
    description:
      "Topics on continuous improvement, ethics, and professional growth",
    questionCount: 15, // 5 original + 10 new
  },
  {
    id: "human-resource-management",
    title: "Human Resource Management",
    description:
      "Questions about staff development, conflict resolution, and team building",
    questionCount: 15, // 5 original + 10 new
  },
];

// Total questions: 20 original + 50 new = 70 questions
export const questions: Question[] = [
  // School Leadership Questions (Original 5 + New 15 = 20)
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
  // --- New School Leadership Questions (15) ---
  {
    id: "sl-6",
    categoryId: "school-leadership",
    question: "What does 'school climate' primarily refer to?",
    options: [
      { id: "a", text: "The architectural design of the school building" },
      { id: "b", text: "The average daily temperature inside the school" },
      {
        id: "c",
        text: "The quality and character of school life, including relationships and safety",
      },
      { id: "d", text: "The school's ranking in standardized test scores" },
    ],
    correctAnswer: "c",
    explanation:
      "School climate refers to the quality and character of school life, encompassing norms, values, interpersonal relationships, teaching and learning practices, and organizational structures that create a safe, supportive, and engaging environment.",
    source: {
      name: "National School Climate Center",
      url: "https://www.schoolclimate.org/climate",
    },
  },
  {
    id: "sl-7",
    categoryId: "school-leadership",
    question:
      "Effective communication from a school leader should primarily be:",
    options: [
      { id: "a", text: "One-way, from leader to staff" },
      { id: "b", text: "Infrequent, to avoid overwhelming staff" },
      {
        id: "c",
        text: "Clear, consistent, and multi-directional (up, down, and across)",
      },
      { id: "d", text: "Focused only on positive news" },
    ],
    correctAnswer: "c",
    explanation:
      "Effective school leadership communication is clear, consistent, and flows in multiple directions – from leadership to staff/students/parents, from stakeholders back to leadership, and among peers. This fosters transparency, trust, and collaboration.",
    source: {
      name: "Communication in Educational Leadership",
      url: "https://www.researchgate.net/publication/334895730_Communication_in_Educational_Leadership",
    },
  },
  {
    id: "sl-8",
    categoryId: "school-leadership",
    question: "What is a key benefit of strong school-community partnerships?",
    options: [
      { id: "a", text: "Reduced teacher workload" },
      {
        id: "b",
        text: "Increased access to resources and support for students",
      },
      { id: "c", text: "Elimination of the need for school fundraising" },
      { id: "d", text: "Guaranteed higher test scores" },
    ],
    correctAnswer: "b",
    explanation:
      "Strong school-community partnerships connect schools with external resources, expertise, and support systems (e.g., businesses, social services, cultural organizations) that can enrich student learning experiences and well-being.",
    source: {
      name: "Building School-Community Partnerships",
      url: "https://www.edutopia.org/article/building-strong-school-community-partnerships",
    },
  },
  {
    id: "sl-9",
    categoryId: "school-leadership",
    question:
      "Which legal concept protects students' rights to privacy regarding their educational records?",
    options: [
      { id: "a", text: "Title IX" },
      { id: "b", text: "Individuals with Disabilities Education Act (IDEA)" },
      { id: "c", text: "Family Educational Rights and Privacy Act (FERPA)" },
      { id: "d", text: "First Amendment" },
    ],
    correctAnswer: "c",
    explanation:
      "FERPA is a U.S. federal law that protects the privacy of student education records. It gives parents certain rights with respect to their children's education records, which transfer to the student upon reaching the age of 18 or attending a school beyond the high school level.",
    source: {
      name: "U.S. Department of Education - FERPA",
      url: "https://www2.ed.gov/policy/gen/guid/fpco/ferpa/index.html",
    },
  },
  {
    id: "sl-10",
    categoryId: "school-leadership",
    question: "Zero-based budgeting in a school context means:",
    options: [
      {
        id: "a",
        text: "Allocating the same budget as the previous year, plus inflation",
      },
      {
        id: "b",
        text: "Justifying every expense from scratch, without reference to prior budgets",
      },
      {
        id: "c",
        text: "Having no budget allocated for non-essential activities",
      },
      {
        id: "d",
        text: "Basing the budget solely on student enrollment numbers",
      },
    ],
    correctAnswer: "b",
    explanation:
      "Zero-based budgeting requires managers to justify all budgeted expenses, not just changes from the previous year. Each activity or program must be justified based on its necessity and contribution to school goals.",
    source: {
      name: "School Finance and Budgeting",
      url: "https://www.investopedia.com/terms/z/zbb.asp", // General finance term, applicable to schools
    },
  },
  {
    id: "sl-11",
    categoryId: "school-leadership",
    question: "What is the primary role of a school board or governing body?",
    options: [
      { id: "a", text: "Managing the day-to-day operations of the school" },
      { id: "b", text: "Hiring and evaluating all school staff" },
      {
        id: "c",
        text: "Setting policy, approving budgets, and providing oversight",
      },
      { id: "d", text: "Developing the daily instructional schedule" },
    ],
    correctAnswer: "c",
    explanation:
      "The school board's primary role is governance, which includes setting district/school policies, approving the budget, hiring and evaluating the superintendent/principal, and ensuring accountability, rather than managing daily operations.",
    source: {
      name: "National School Boards Association - Roles and Responsibilities",
      url: "https://www.nsba.org/About/Roles-and-Responsibilities",
    },
  },
  {
    id: "sl-12",
    categoryId: "school-leadership",
    question:
      "Data-driven decision making in schools involves primarily using data to:",
    options: [
      { id: "a", text: "Rank teachers based on performance" },
      {
        id: "b",
        text: "Identify student needs and inform instructional adjustments",
      },
      { id: "c", text: "Justify budget requests to the district" },
      { id: "d", text: "Complete mandatory state reporting requirements" },
    ],
    correctAnswer: "b",
    explanation:
      "Data-driven decision making uses various forms of data (assessment results, attendance, behavior records, etc.) to understand student learning needs, identify effective practices, and make informed adjustments to curriculum, instruction, and support services.",
    source: {
      name: "Using Data to Improve Schools",
      url: "https://www.edutopia.org/topic/data-driven-instruction",
    },
  },
  {
    id: "sl-13",
    categoryId: "school-leadership",
    question: "A crucial first step in managing a school crisis is:",
    options: [
      { id: "a", text: "Immediately contacting the media" },
      { id: "b", text: "Assigning blame for the situation" },
      {
        id: "c",
        text: "Ensuring the safety and security of students and staff",
      },
      {
        id: "d",
        text: "Holding a staff meeting to discuss long-term solutions",
      },
    ],
    correctAnswer: "c",
    explanation:
      "In any school crisis (e.g., natural disaster, safety threat), the immediate priority for leadership is to ensure the physical and emotional safety and security of everyone on campus before addressing other concerns.",
    source: {
      name: "School Crisis Management Guide",
      url: "https://rems.ed.gov/docs/DOE_School_Safety_Guide.pdf",
    },
  },
  {
    id: "sl-14",
    categoryId: "school-leadership",
    question: "Building a positive school culture is essential because it:",
    options: [
      { id: "a", text: "Guarantees funding increases from the state" },
      {
        id: "b",
        text: "Directly impacts staff morale, student engagement, and overall achievement",
      },
      { id: "c", text: "Simplifies the teacher evaluation process" },
      { id: "d", text: "Reduces the need for parent communication" },
    ],
    correctAnswer: "b",
    explanation:
      "A positive school culture, characterized by shared values, collaboration, trust, and high expectations, is strongly linked to improved staff morale and retention, greater student engagement and sense of belonging, and better academic outcomes.",
    source: {
      name: "Shaping School Culture: Pitfalls, Paradoxes, & Promises",
      url: "https://www.wiley.com/en-us/Shaping+School+Culture%3A+Pitfalls%2C+Paradoxes%2C+%26+Promises%2C+3rd+Edition-p-9781119210108",
    },
  },
  {
    id: "sl-15",
    categoryId: "school-leadership",
    question: "Servant leadership in a school context emphasizes:",
    options: [
      { id: "a", text: "The leader's authority and control over staff" },
      {
        id: "b",
        text: "Meeting the needs of others (staff, students) to help them grow and perform",
      },
      { id: "c", text: "Focusing solely on achieving measurable targets" },
      { id: "d", text: "Maintaining strict hierarchical structures" },
    ],
    correctAnswer: "b",
    explanation:
      "Servant leadership prioritizes the growth and well-being of people and the communities to which they belong. The servant-leader shares power, puts the needs of others first, and helps people develop and perform as highly as possible.",
    source: {
      name: "Greenleaf Center for Servant Leadership",
      url: "https://www.greenleaf.org/what-is-servant-leadership/",
    },
  },
  {
    id: "sl-16",
    categoryId: "school-leadership",
    question: "Advocacy by a school leader often involves:",
    options: [
      {
        id: "a",
        text: "Speaking out for the needs of the school and its students to policymakers and the community",
      },
      { id: "b", text: "Ignoring external political influences on education" },
      { id: "c", text: "Focusing only on internal school matters" },
      { id: "d", text: "Assigning advocacy tasks solely to parent groups" },
    ],
    correctAnswer: "a",
    explanation:
      "Educational advocacy involves leaders actively supporting and representing the interests and needs of their school, students, and staff to various audiences, including policymakers, district officials, and the wider community, to secure resources or favorable policies.",
    source: {
      name: "The Principal as Advocate",
      url: "https://www.learningforward.org/journal/the-principal-as-advocate/",
    },
  },
  {
    id: "sl-17",
    categoryId: "school-leadership",
    question: "An ethical dilemma in school leadership typically involves:",
    options: [
      { id: "a", text: "A clear choice between right and wrong" },
      {
        id: "b",
        text: "A situation with competing values or stakeholder interests, where any choice may have negative consequences",
      },
      { id: "c", text: "A simple administrative error" },
      { id: "d", text: "A disagreement over teaching methodology" },
    ],
    correctAnswer: "b",
    explanation:
      "Ethical dilemmas arise when school leaders face situations where core values conflict, and any potential course of action could compromise one value while upholding another, often affecting multiple stakeholders differently.",
    source: {
      name: "Ethical Leadership in Schools",
      url: "https://www.researchgate.net/publication/254227313_Ethical_Leadership_in_Schools_Understanding_the_Challenges",
    },
  },
  {
    id: "sl-18",
    categoryId: "school-leadership",
    question:
      "Strategic planning in schools differs from operational planning in that it focuses on:",
    options: [
      { id: "a", text: "Daily schedules and routines" },
      {
        id: "b",
        text: "Long-term vision, goals, and resource allocation to achieve that vision",
      },
      { id: "c", text: "Immediate crisis response procedures" },
      { id: "d", text: "Individual teacher lesson plans" },
    ],
    correctAnswer: "b",
    explanation:
      "Strategic planning involves defining a school's long-term direction (3-5 years or more), setting ambitious goals, and outlining the major strategies and resource deployments needed to achieve them, whereas operational planning focuses on short-term, day-to-day activities.",
    source: {
      name: "Strategic Planning for Schools",
      url: "https://www.ascd.org/el/articles/strategic-planning-for-school-improvement",
    },
  },
  {
    id: "sl-19",
    categoryId: "school-leadership",
    question: "Managing change effectively in a school requires leaders to:",
    options: [
      { id: "a", text: "Implement changes suddenly without prior notice" },
      { id: "b", text: "Ignore resistance from staff and parents" },
      {
        id: "c",
        text: "Communicate the reasons for change, involve stakeholders, and provide support",
      },
      { id: "d", text: "Focus solely on the logistical aspects of the change" },
    ],
    correctAnswer: "c",
    explanation:
      "Effective change management involves clear communication about the 'why' behind the change, engaging stakeholders in the process, addressing concerns and resistance constructively, and providing the necessary training and resources to adapt.",
    source: {
      name: "Leading Change in Schools",
      url: "https://www.edweek.org/leadership/opinion-leading-change-in-schools-its-about-the-how/2018/09",
    },
  },
  {
    id: "sl-20",
    categoryId: "school-leadership",
    question: "Situational leadership theory suggests that effective leaders:",
    options: [
      { id: "a", text: "Use the same leadership style consistently" },
      {
        id: "b",
        text: "Adapt their leadership style based on the readiness level of their followers and the task",
      },
      { id: "c", text: "Delegate all decision-making to their team" },
      { id: "d", text: "Focus primarily on building personal relationships" },
    ],
    correctAnswer: "b",
    explanation:
      "Situational leadership theory posits that there is no single best leadership style. Effective leaders adapt their approach (e.g., directing, coaching, supporting, delegating) based on the specific situation, considering the competence and commitment (readiness) of their team members for a given task.",
    source: {
      name: "Situational Leadership Theory (Hersey & Blanchard)",
      url: "https://situational.com/situational-leadership/",
    },
  },

  // Instructional Leadership Questions (Original 5 + New 15 = 20)
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
  // --- New Instructional Leadership Questions (15) ---
  {
    id: "il-6",
    categoryId: "instructional-leadership",
    question: "Curriculum alignment refers to the process of ensuring that:",
    options: [
      { id: "a", text: "All teachers use the exact same lesson plans" },
      {
        id: "b",
        text: "What is taught (curriculum) matches the standards and assessments",
      },
      { id: "c", text: "Students select their own learning objectives" },
      {
        id: "d",
        text: "The curriculum is updated annually regardless of need",
      },
    ],
    correctAnswer: "b",
    explanation:
      "Curriculum alignment ensures coherence between the intended curriculum (learning standards), the taught curriculum (instructional activities), and the assessed curriculum (how learning is measured). This ensures students are taught what they are expected to learn and assessed on.",
    source: {
      name: "Understanding Curriculum Alignment",
      url: "https://www.edglossary.org/curriculum-alignment/",
    },
  },
  {
    id: "il-7",
    categoryId: "instructional-leadership",
    question:
      "Assessment literacy for teachers primarily involves understanding:",
    options: [
      {
        id: "a",
        text: "How to create aesthetically pleasing charts of test scores",
      },
      {
        id: "b",
        text: "How to design, select, interpret, and use high-quality assessments to improve student learning",
      },
      {
        id: "c",
        text: "The history of standardized testing in the United States",
      },
      {
        id: "d",
        text: "Only the administration procedures for state-mandated tests",
      },
    ],
    correctAnswer: "b",
    explanation:
      "Assessment literacy encompasses the knowledge and skills teachers need to effectively use assessment information. This includes understanding different assessment types (formative, summative, diagnostic), ensuring validity and reliability, interpreting results accurately, and using findings to guide instruction.",
    source: {
      name: "Assessment Literacy Defined",
      url: "https://www.nciea.org/blog/assessment-literacy-defined",
    },
  },
  {
    id: "il-8",
    categoryId: "instructional-leadership",
    question:
      "Which model emphasizes integrating technology seamlessly into teaching and learning to enhance student outcomes?",
    options: [
      { id: "a", text: "The Dewey Decimal System" },
      { id: "b", text: "Bloom's Taxonomy" },
      {
        id: "c",
        text: "The SAMR Model (Substitution, Augmentation, Modification, Redefinition)",
      },
      { id: "d", text: "Maslow's Hierarchy of Needs" },
    ],
    correctAnswer: "c",
    explanation:
      "The SAMR model, developed by Dr. Ruben Puentedura, provides a framework for integrating technology into teaching and learning. It categorizes technology use from simple substitution to transformative redefinition of tasks, aiming for higher levels of enhancement and transformation.",
    source: {
      name: "SAMR Model Explained",
      url: "https://www.commonsense.org/education/articles/the-samr-model-explained",
    },
  },
  {
    id: "il-9",
    categoryId: "instructional-leadership",
    question:
      "Supporting English Language Learners (ELLs) effectively often requires:",
    options: [
      {
        id: "a",
        text: "Prohibiting the use of their native language in the classroom",
      },
      {
        id: "b",
        text: "Using sheltered instruction techniques and providing language supports",
      },
      { id: "c", text: "Lowering academic expectations significantly" },
      { id: "d", text: "Isolating them from native English-speaking peers" },
    ],
    correctAnswer: "b",
    explanation:
      "Effective support for ELLs involves strategies like sheltered instruction (making content comprehensible), visual aids, graphic organizers, cooperative learning, and valuing their linguistic and cultural backgrounds, while maintaining high academic expectations.",
    source: {
      name: "Colorín Colorado - ELL Strategies & Best Practices",
      url: "https://www.colorincolorado.org/ell-strategies-best-practices",
    },
  },
  {
    id: "il-10",
    categoryId: "instructional-leadership",
    question: "Instructional coaching primarily aims to:",
    options: [
      { id: "a", text: "Evaluate teachers for administrative decisions" },
      {
        id: "b",
        text: "Provide confidential, job-embedded support to help teachers improve their practice",
      },
      { id: "c", text: "Deliver pre-packaged curriculum units to teachers" },
      { id: "d", text: "Manage classroom discipline issues for teachers" },
    ],
    correctAnswer: "b",
    explanation:
      "Instructional coaching is a non-evaluative, collaborative partnership where a coach works with teachers to refine their skills, implement new strategies, analyze student work, and ultimately improve student learning. It focuses on growth and support.",
    source: {
      name: "Instructional Coaching Group (Jim Knight)",
      url: "https://www.instructionalcoaching.com/",
    },
  },
  {
    id: "il-11",
    categoryId: "instructional-leadership",
    question: "Standards-based grading focuses on assessing:",
    options: [
      { id: "a", text: "Student effort and participation" },
      { id: "b", text: "Completion of homework assignments" },
      {
        id: "c",
        text: "Student proficiency against specific learning standards or objectives",
      },
      { id: "d", text: "How a student's performance compares to their peers" },
    ],
    correctAnswer: "c",
    explanation:
      "Standards-based grading measures student progress and achievement against clearly defined learning standards. Grades reflect what students know and can do relative to these standards, rather than incorporating factors like effort, attendance, or behavior.",
    source: {
      name: "Standards-Based Grading Explained",
      url: "https://www.edutopia.org/article/standards-based-grading-explained",
    },
  },
  {
    id: "il-12",
    categoryId: "instructional-leadership",
    question: "Project-Based Learning (PBL) is characterized by:",
    options: [
      {
        id: "a",
        text: "Students passively receiving information through lectures",
      },
      { id: "b", text: "Short, unrelated activities completed individually" },
      {
        id: "c",
        text: "Students engaging in extended inquiry to solve a real-world problem or answer a complex question",
      },
      { id: "d", text: "Emphasis on rote memorization of facts" },
    ],
    correctAnswer: "c",
    explanation:
      "PBL is a teaching method where students learn by actively engaging in real-world and personally meaningful projects. It involves sustained inquiry, authenticity, student voice and choice, reflection, critique, and a public product.",
    source: {
      name: "PBLWorks (Buck Institute for Education)",
      url: "https://www.pblworks.org/what-is-pbl",
    },
  },
  {
    id: "il-13",
    categoryId: "instructional-leadership",
    question: "Culturally Responsive Teaching aims to:",
    options: [
      {
        id: "a",
        text: "Treat all students exactly the same, ignoring cultural differences",
      },
      {
        id: "b",
        text: "Use students' cultural backgrounds and experiences to make learning more relevant and effective",
      },
      {
        id: "c",
        text: "Focus only on the dominant culture in curriculum materials",
      },
      {
        id: "d",
        text: "Separate students into groups based on their cultural backgrounds",
      },
    ],
    correctAnswer: "b",
    explanation:
      "Culturally Responsive Teaching recognizes the importance of including students' cultural references in all aspects of learning. It involves using diverse teaching strategies and curriculum materials that connect with students' backgrounds and experiences.",
    source: {
      name: "Culturally Responsive Teaching: Theory, Research, and Practice",
      url: "https://www.amazon.com/Culturally-Responsive-Teaching-Research-Multicultural/dp/0807750781", // Reference to book by Geneva Gay
    },
  },
  {
    id: "il-14",
    categoryId: "instructional-leadership",
    question:
      "Response to Intervention (RTI) is a multi-tiered approach designed to:",
    options: [
      { id: "a", text: "Identify gifted and talented students" },
      {
        id: "b",
        text: "Provide early, systematic assistance to children who are struggling academically",
      },
      { id: "c", text: "Replace special education services entirely" },
      { id: "d", text: "Focus solely on behavioral interventions" },
    ],
    correctAnswer: "b",
    explanation:
      "RTI is a framework for identifying and supporting students with learning and behavior needs. It involves providing high-quality instruction and interventions matched to student need, monitoring progress frequently, and using data to make educational decisions.",
    source: {
      name: "RTI Action Network",
      url: "http://www.rtinetwork.org/learn/what/whatisrti",
    },
  },
  {
    id: "il-15",
    categoryId: "instructional-leadership",
    question: "Inquiry-based learning primarily involves:",
    options: [
      {
        id: "a",
        text: "Teachers providing students with all the answers upfront",
      },
      {
        id: "b",
        text: "Students formulating questions, investigating, and constructing their own knowledge",
      },
      { id: "c", text: "Memorizing facts presented in a textbook" },
      { id: "d", text: "Completing worksheets with single correct answers" },
    ],
    correctAnswer: "b",
    explanation:
      "Inquiry-based learning is an active learning process where students pose questions, explore issues, conduct research, and build understanding through investigation, rather than simply receiving information passively.",
    source: {
      name: "What Is Inquiry-Based Learning?",
      url: "https://www.thoughtco.com/what-is-inquiry-based-learning-4152457",
    },
  },
  {
    id: "il-16",
    categoryId: "instructional-leadership",
    question: "What is the role of 'wait time' in classroom discussions?",
    options: [
      {
        id: "a",
        text: "To give the teacher time to formulate the next question",
      },
      {
        id: "b",
        text: "To allow students more time to think and formulate deeper responses",
      },
      { id: "c", text: "To create intentional awkward silences" },
      {
        id: "d",
        text: "To provide a break for students who are not participating",
      },
    ],
    correctAnswer: "b",
    explanation:
      "Wait time (pausing after asking a question and after a student responds) allows students crucial moments to process information, formulate more thoughtful answers, and encourages broader participation.",
    source: {
      name: "The Power of Wait Time",
      url: "https://www.edutopia.org/article/power-wait-time",
    },
  },
  {
    id: "il-17",
    categoryId: "instructional-leadership",
    question: "Summative assessments are primarily used to:",
    options: [
      { id: "a", text: "Guide ongoing instruction during a unit" },
      { id: "b", text: "Diagnose specific learning difficulties" },
      {
        id: "c",
        text: "Evaluate student learning at the end of an instructional period (e.g., unit, semester)",
      },
      {
        id: "d",
        text: "Provide immediate feedback to students during a lesson",
      },
    ],
    correctAnswer: "c",
    explanation:
      "Summative assessments (e.g., final exams, projects, standardized tests) evaluate student learning, skill acquisition, and achievement at the conclusion of a defined instructional period, often for grading or accountability purposes.",
    source: {
      name: "Formative vs. Summative Assessment",
      url: "https://www.cmu.edu/teaching/assessment/basics/formative-summative.html",
    },
  },
  {
    id: "il-18",
    categoryId: "instructional-leadership",
    question: "Universal Design for Learning (UDL) provides a framework to:",
    options: [
      {
        id: "a",
        text: "Design specialized curriculum only for students with disabilities",
      },
      {
        id: "b",
        text: "Create learning environments and materials that are accessible and effective for all learners",
      },
      { id: "c", text: "Standardize classroom furniture and layout" },
      { id: "d", text: "Focus instruction solely on auditory learning styles" },
    ],
    correctAnswer: "b",
    explanation:
      "UDL is a framework based on neuroscience research that aims to optimize teaching and learning for all people based on individual differences by providing multiple means of engagement, representation, and action/expression.",
    source: {
      name: "CAST - About Universal Design for Learning",
      url: "https://www.cast.org/impact/universal-design-for-learning-udl",
    },
  },
  {
    id: "il-19",
    categoryId: "instructional-leadership",
    question: "Metacognition, in an educational context, refers to:",
    options: [
      { id: "a", text: "A student's ability to memorize facts quickly" },
      {
        id: "b",
        text: "A student's awareness and understanding of their own thought processes ('thinking about thinking')",
      },
      { id: "c", text: "Collaborative problem-solving skills" },
      { id: "d", text: "The teacher's knowledge of the subject matter" },
    ],
    correctAnswer: "b",
    explanation:
      "Metacognition involves students understanding how they learn best, monitoring their comprehension, planning learning strategies, and adjusting their approach when needed. It's a critical component of effective learning.",
    source: {
      name: "Teaching Metacognition",
      url: "https://cft.vanderbilt.edu/guides-sub-pages/metacognition/",
    },
  },
  {
    id: "il-20",
    categoryId: "instructional-leadership",
    question:
      "An instructional leader's role in curriculum development often involves:",
    options: [
      { id: "a", text: "Writing all lesson plans for every teacher" },
      {
        id: "b",
        text: "Facilitating collaboration among teachers to review, select, and align curriculum materials",
      },
      {
        id: "c",
        text: "Mandating the use of a single textbook for all subjects and grades",
      },
      { id: "d", text: "Avoiding any discussion about curriculum choices" },
    ],
    correctAnswer: "b",
    explanation:
      "Instructional leaders guide the process of curriculum development and refinement, ensuring alignment with standards, promoting teacher collaboration, providing resources, and monitoring implementation to ensure effectiveness.",
    source: {
      name: "The Principal's Role in Curriculum Leadership",
      url: "https://www.ascd.org/el/articles/the-principals-role-in-instructional-leadership",
    },
  },

  // Personal and Professional Development Questions (Original 5 + New 10 = 15)
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
  // --- New Personal & Professional Development Questions (10) ---
  {
    id: "ppd-6",
    categoryId: "personal-and-professional-development",
    question: "Emotional intelligence (EI) for school leaders involves:",
    options: [
      { id: "a", text: "Suppressing all emotions in the workplace" },
      {
        id: "b",
        text: "Understanding and managing one's own emotions and recognizing/influencing the emotions of others",
      },
      { id: "c", text: "Having a high IQ score" },
      { id: "d", text: "Focusing solely on cognitive tasks" },
    ],
    correctAnswer: "b",
    explanation:
      "Emotional intelligence is crucial for leadership. It encompasses self-awareness, self-regulation, motivation, empathy, and social skills, enabling leaders to build relationships, manage conflict, and create a positive emotional climate.",
    source: {
      name: "Emotional Intelligence in Leadership (Daniel Goleman)",
      url: "https://hbr.org/2004/01/what-makes-a-leader",
    },
  },
  {
    id: "ppd-7",
    categoryId: "personal-and-professional-development",
    question: "Effective time management for school leaders often requires:",
    options: [
      { id: "a", text: "Responding to every email immediately as it arrives" },
      {
        id: "b",
        text: "Prioritizing tasks based on importance and urgency, and delegating appropriately",
      },
      { id: "c", text: "Working longer hours than everyone else on staff" },
      { id: "d", text: "Avoiding planning and scheduling to remain flexible" },
    ],
    correctAnswer: "b",
    explanation:
      "Given the demanding nature of school leadership, effective time management involves strategically prioritizing tasks (e.g., using an Eisenhower Matrix), delegating when possible, scheduling focused work time, and protecting time for high-priority activities like instructional leadership.",
    source: {
      name: "Time Management for School Leaders",
      url: "https://www.wallacefoundation.org/knowledge-center/pages/time-management-strategies-for-school-leaders.aspx",
    },
  },
  {
    id: "ppd-8",
    categoryId: "personal-and-professional-development",
    question:
      "Seeking mentorship as a school leader is valuable primarily because it:",
    options: [
      { id: "a", text: "Provides someone to delegate difficult tasks to" },
      {
        id: "b",
        text: "Offers guidance, support, and perspective from a more experienced colleague",
      },
      { id: "c", text: "Fulfills a mandatory district requirement" },
      { id: "d", text: "Eliminates the need for self-reflection" },
    ],
    correctAnswer: "b",
    explanation:
      "Mentorship provides a safe space for leaders to discuss challenges, receive advice, gain different perspectives, and learn from the experiences of a trusted, more seasoned professional, accelerating their growth and effectiveness.",
    source: {
      name: "The Value of Mentorship in Educational Leadership",
      url: "https://www.naesp.org/resource/the-value-of-mentoring/",
    },
  },
  {
    id: "ppd-9",
    categoryId: "personal-and-professional-development",
    question: "Lifelong learning for educational leaders means:",
    options: [
      {
        id: "a",
        text: "Completing the minimum required professional development hours",
      },
      {
        id: "b",
        text: "Believing that learning stops once a leadership position is attained",
      },
      {
        id: "c",
        text: "Actively and continuously seeking new knowledge, skills, and perspectives throughout one's career",
      },
      {
        id: "d",
        text: "Reading only administrative manuals and policy updates",
      },
    ],
    correctAnswer: "c",
    explanation:
      "The field of education is constantly evolving. Lifelong learning involves a commitment to continuous professional growth through reading, attending conferences, networking, pursuing further education, and reflecting on practice to stay current and effective.",
    source: {
      name: "Importance of Lifelong Learning for Leaders",
      url: "https://www.forbes.com/sites/forbescoachescouncil/2020/01/16/why-lifelong-learning-is-the-key-to-career-success/", // General leadership principle
    },
  },
  {
    id: "ppd-10",
    categoryId: "personal-and-professional-development",
    question:
      "Maintaining professional boundaries as a school leader involves:",
    options: [
      { id: "a", text: "Becoming best friends with all staff members" },
      {
        id: "b",
        text: "Establishing clear limits on relationships and interactions to uphold professionalism and fairness",
      },
      {
        id: "c",
        text: "Sharing personal problems extensively with subordinates",
      },
      { id: "d", text: "Never socializing with staff outside of school hours" },
    ],
    correctAnswer: "b",
    explanation:
      "Professional boundaries are essential for maintaining trust, fairness, and appropriate leader-follower dynamics. This involves being friendly but not overly familiar, avoiding favoritism, maintaining confidentiality, and handling personal/professional interactions appropriately.",
    source: {
      name: "Setting Professional Boundaries for Leaders",
      url: "https://www.psychologytoday.com/us/blog/high-octane-women/201311/10-ways-build-and-preserve-better-boundaries", // General psychological principle
    },
  },
  {
    id: "ppd-11",
    categoryId: "personal-and-professional-development",
    question:
      "What is a primary benefit of networking with other school leaders?",
    options: [
      { id: "a", text: "Finding opportunities to criticize other schools" },
      {
        id: "b",
        text: "Sharing best practices, problem-solving collaboratively, and reducing professional isolation",
      },
      {
        id: "c",
        text: "Gaining access to confidential student information from other schools",
      },
      { id: "d", text: "Focusing solely on social interactions" },
    ],
    correctAnswer: "b",
    explanation:
      "Networking allows school leaders to connect with peers facing similar challenges, share successful strategies, gain fresh perspectives, learn about new resources, and build a supportive professional community, combating the isolation often felt in leadership roles.",
    source: {
      name: "The Power of Networking for School Leaders",
      url: "https://www.aasa.org/resources/aasa-school-administrator/archives/september-2019/colleague-power-networking",
    },
  },
  {
    id: "ppd-12",
    categoryId: "personal-and-professional-development",
    question:
      "Self-awareness is critical for school leaders because it helps them to:",
    options: [
      { id: "a", text: "Identify the weaknesses in their staff members" },
      {
        id: "b",
        text: "Understand their own strengths, weaknesses, biases, and how their behavior impacts others",
      },
      { id: "c", text: "Justify their decisions without seeking input" },
      { id: "d", text: "Focus only on external school performance data" },
    ],
    correctAnswer: "b",
    explanation:
      "Self-awareness allows leaders to recognize their own emotional triggers, biases, communication style, and leadership tendencies. This understanding enables them to manage themselves more effectively, build stronger relationships, and lead more authentically.",
    source: {
      name: "The Importance of Self-Awareness in Leadership",
      url: "https://hbr.org/2018/01/what-self-awareness-really-is-and-how-to-cultivate-it",
    },
  },
  {
    id: "ppd-13",
    categoryId: "personal-and-professional-development",
    question:
      "Which strategy is most effective for managing leadership stress?",
    options: [
      { id: "a", text: "Ignoring the stress and hoping it goes away" },
      { id: "b", text: "Working continuously without breaks" },
      {
        id: "c",
        text: "Developing healthy coping mechanisms, seeking support, and maintaining work-life balance",
      },
      {
        id: "d",
        text: "Blaming external factors for all stressful situations",
      },
    ],
    correctAnswer: "c",
    explanation:
      "Managing the inherent stress of school leadership requires proactive strategies such as mindfulness, exercise, hobbies, setting boundaries, delegating tasks, building a support network (personal and professional), and prioritizing well-being.",
    source: {
      name: "Stress Management for School Leaders",
      url: "https://www.naesp.org/resource/principal-stress-sources-symptoms-and-solutions/",
    },
  },
  {
    id: "ppd-14",
    categoryId: "personal-and-professional-development",
    question:
      "Staying current with educational research helps school leaders to:",
    options: [
      {
        id: "a",
        text: "Implement every new trend without critical evaluation",
      },
      {
        id: "b",
        text: "Make informed decisions based on evidence of effective practices",
      },
      { id: "c", text: "Impress others with complex terminology" },
      { id: "d", text: "Disregard the practical experience of teachers" },
    ],
    correctAnswer: "b",
    explanation:
      "Keeping abreast of current research allows leaders to understand what strategies and approaches are most likely to be effective in improving teaching and learning, enabling them to make evidence-informed decisions rather than relying solely on tradition or intuition.",
    source: {
      name: "Using Research to Inform Practice",
      url: "https://www.ascd.org/el/articles/using-research-to-improve-teaching-and-learning",
    },
  },
  {
    id: "ppd-15",
    categoryId: "personal-and-professional-development",
    question: "Ethical decision-making frameworks help school leaders to:",
    options: [
      { id: "a", text: "Find loopholes in school policies" },
      {
        id: "b",
        text: "Make decisions quickly without considering consequences",
      },
      {
        id: "c",
        text: "Systematically analyze complex situations involving competing values and stakeholder interests",
      },
      { id: "d", text: "Always choose the most popular option" },
    ],
    correctAnswer: "c",
    explanation:
      "Ethical frameworks (e.g., based on principles like justice, care, critique) provide structured ways to analyze ethical dilemmas, consider different perspectives, evaluate potential consequences, and make reasoned, defensible decisions aligned with professional ethics.",
    source: {
      name: "A Framework for Ethical Decision Making",
      url: "https://www.brown.edu/academics/science-and-technology-studies/framework-making-ethical-decisions", // General ethics framework
    },
  },

  // Human Resource Management Questions (Original 5 + New 10 = 15)
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
  // --- New Human Resource Management Questions (10) ---
  {
    id: "hrm-6",
    categoryId: "human-resource-management",
    question: "Effective teacher recruitment strategies often include:",
    options: [
      {
        id: "a",
        text: "Hiring the first applicant who meets minimum qualifications",
      },
      {
        id: "b",
        text: "Posting vague job descriptions to attract a wide range of candidates",
      },
      {
        id: "c",
        text: "Actively seeking diverse candidates and clearly articulating the school's vision and needs",
      },
      { id: "d", text: "Relying solely on internal referrals" },
    ],
    correctAnswer: "c",
    explanation:
      "Effective recruitment involves proactive strategies like developing clear, compelling job descriptions, using multiple sourcing channels, actively seeking diverse applicant pools, and effectively communicating the school's culture and goals to attract the best-fit candidates.",
    source: {
      name: "Teacher Recruitment and Retention",
      url: "https://learningpolicyinstitute.org/topic/teacher-recruitment-and-retention",
    },
  },
  {
    id: "hrm-7",
    categoryId: "human-resource-management",
    question: "Behavioral-based interviewing questions ask candidates to:",
    options: [
      { id: "a", text: "Describe hypothetical situations" },
      { id: "b", text: "Share their opinions on educational policies" },
      {
        id: "c",
        text: "Provide specific examples of how they handled past situations",
      },
      { id: "d", text: "Answer questions about their personal hobbies" },
    ],
    correctAnswer: "c",
    explanation:
      "Behavioral-based interviewing operates on the premise that past behavior predicts future performance. Interviewers ask candidates to describe specific instances where they demonstrated relevant skills or competencies (e.g., 'Tell me about a time you handled a difficult student').",
    source: {
      name: "SHRM - Behavioral Interviewing Guide",
      url: "https://www.shrm.org/resourcesandtools/tools-and-samples/hr-qa/pages/behavioralinterviewingguide.aspx", // General HR principle
    },
  },
  {
    id: "hrm-8",
    categoryId: "human-resource-management",
    question:
      "The primary goal of teacher onboarding (beyond basic logistics) is to:",
    options: [
      { id: "a", text: "Complete necessary paperwork quickly" },
      {
        id: "b",
        text: "Integrate new teachers into the school culture and provide necessary support for success",
      },
      {
        id: "c",
        text: "Introduce new teachers to the staff evaluation system immediately",
      },
      { id: "d", text: "Assign the most challenging classes to new hires" },
    ],
    correctAnswer: "b",
    explanation:
      "Effective onboarding goes beyond paperwork and logistics; it focuses on acculturating new hires into the school's norms, values, and practices, connecting them with mentors and colleagues, and providing the resources and support needed for a successful start.",
    source: {
      name: "Effective Teacher Onboarding Practices",
      url: "https://www.edweek.org/leadership/opinion-how-to-make-teacher-onboarding-more-effective/2021/08",
    },
  },
  {
    id: "hrm-9",
    categoryId: "human-resource-management",
    question: "Progressive discipline typically involves:",
    options: [
      { id: "a", text: "Immediate termination for any infraction" },
      {
        id: "b",
        text: "A sequence of increasingly severe steps to correct employee performance or behavior",
      },
      { id: "c", text: "Ignoring minor performance issues" },
      {
        id: "d",
        text: "Applying the same disciplinary action regardless of the offense",
      },
    ],
    correctAnswer: "b",
    explanation:
      "Progressive discipline uses a series of steps (e.g., verbal warning, written warning, suspension, termination) to address employee misconduct or performance issues, providing opportunities for correction before resorting to more severe actions.",
    source: {
      name: "Understanding Progressive Discipline",
      url: "https://www.shrm.org/resourcesandtools/tools-and-samples/hr-qa/pages/whatisprogressivediscipline.aspx", // General HR principle
    },
  },
  {
    id: "hrm-10",
    categoryId: "human-resource-management",
    question:
      "Building collaborative teams among school staff requires leaders to:",
    options: [
      { id: "a", text: "Encourage competition between departments" },
      { id: "b", text: "Make all decisions for the teams" },
      {
        id: "c",
        text: "Foster trust, establish clear goals, and provide structures for meaningful collaboration",
      },
      {
        id: "d",
        text: "Assign individuals to teams randomly without considering skills",
      },
    ],
    correctAnswer: "c",
    explanation:
      "Leaders foster effective teamwork by building a culture of trust and psychological safety, defining shared goals and roles, providing dedicated time and structures (like PLCs) for collaboration, and empowering teams to work together effectively.",
    source: {
      name: "Building Collaborative Teams in Schools",
      url: "https://www.ascd.org/el/articles/building-a-collaborative-school-culture",
    },
  },
  {
    id: "hrm-11",
    categoryId: "human-resource-management",
    question:
      "Which factor is consistently linked to higher teacher retention rates?",
    options: [
      { id: "a", text: "Increased standardized testing frequency" },
      {
        id: "b",
        text: "Strong administrative support and positive school culture",
      },
      { id: "c", text: "Larger class sizes" },
      { id: "d", text: "Frequent changes in curriculum" },
    ],
    correctAnswer: "b",
    explanation:
      "Research consistently shows that supportive leadership, a positive and collaborative school culture, and opportunities for professional growth are key factors in retaining effective teachers, more so than salary alone in many cases.",
    source: {
      name: "Factors Influencing Teacher Retention",
      url: "https://learningpolicyinstitute.org/product/understanding-teacher-retention-brief",
    },
  },
  {
    id: "hrm-12",
    categoryId: "human-resource-management",
    question:
      "What is a potential legal risk associated with inconsistent application of school policies?",
    options: [
      { id: "a", text: "Improved staff morale" },
      { id: "b", text: "Claims of discrimination or unfair treatment" },
      { id: "c", text: "Increased student achievement" },
      { id: "d", text: "Simplified administrative procedures" },
    ],
    correctAnswer: "b",
    explanation:
      "Applying policies (e.g., regarding discipline, leave, evaluation) inconsistently among staff members can lead to perceptions of bias and potential legal challenges based on claims of discrimination or unfair treatment.",
    source: {
      name: "Legal Issues in School HR Management",
      url: "https://www.nsba.org/Perspectives/2019/legal-issues-school-human-resources",
    },
  },
  {
    id: "hrm-13",
    categoryId: "human-resource-management",
    question:
      "Providing meaningful professional development for staff is crucial for:",
    options: [
      { id: "a", text: "Filling up mandated training days" },
      {
        id: "b",
        text: "Improving instructional practices, boosting morale, and retaining talent",
      },
      { id: "c", text: "Keeping teachers busy during non-instructional time" },
      { id: "d", text: "Reducing the school's overall budget" },
    ],
    correctAnswer: "b",
    explanation:
      "High-quality, relevant professional development helps teachers refine their skills, learn new strategies, stay current in their field, and feel valued, which contributes to better teaching, higher morale, and increased retention.",
    source: {
      name: "Learning Forward - Standards for Professional Learning",
      url: "https://learningforward.org/standards/",
    },
  },
  {
    id: "hrm-14",
    categoryId: "human-resource-management",
    question:
      "When handling a difficult conversation with an underperforming staff member, a leader should:",
    options: [
      { id: "a", text: "Be vague about the issues to avoid confrontation" },
      {
        id: "b",
        text: "Focus on specific, observable behaviors and performance gaps, and collaboratively plan for improvement",
      },
      { id: "c", text: "Discuss the issues publicly during a staff meeting" },
      {
        id: "d",
        text: "Make personal attacks on the staff member's character",
      },
    ],
    correctAnswer: "b",
    explanation:
      "Effective feedback, especially during difficult conversations, should be specific, behavioral, objective, and focused on performance, not personality. The goal is typically to clarify expectations and support improvement, requiring a clear plan and follow-up.",
    source: {
      name: "Crucial Conversations: Tools for Talking When Stakes Are High",
      url: "https://www.amazon.com/Crucial-Conversations-Talking-Stakes-Second/dp/0071771328", // General communication skill book
    },
  },
  {
    id: "hrm-15",
    categoryId: "human-resource-management",
    question:
      "Understanding the basics of collective bargaining agreements (if applicable) is important for school leaders primarily to:",
    options: [
      { id: "a", text: "Find ways to bypass the agreement" },
      {
        id: "b",
        text: "Ensure compliance with contractual obligations regarding staff rights, responsibilities, and working conditions",
      },
      {
        id: "c",
        text: "Negotiate individual deals with teachers outside the contract",
      },
      {
        id: "d",
        text: "Ignore the agreement as it only applies to union representatives",
      },
    ],
    correctAnswer: "b",
    explanation:
      "Where collective bargaining agreements exist, school leaders must understand and adhere to their terms regarding issues like workload, evaluation procedures, grievance processes, compensation, and leave, to maintain legal compliance and positive labor relations.",
    source: {
      name: "Basics of Collective Bargaining in Education",
      url: "https://www.nea.org/professional-excellence/student-engagement/tools-tips/collective-bargaining", // National Education Association perspective
    },
  },
];
