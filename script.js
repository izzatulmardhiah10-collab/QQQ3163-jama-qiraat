const steps = document.querySelectorAll(".step");

    steps.forEach((step) => {
      const button = step.querySelector(".step-button");
      button.addEventListener("click", () => {
        const isOpen = step.classList.toggle("open");
        button.setAttribute("aria-expanded", String(isOpen));
      });
    });

    const arabicNumber = new Intl.NumberFormat("ar-EG");

    const questions = [
      {
        question: "ما المعنى اللغوي الأقرب لكلمة الجمع؟",
        options: ["الضمّ والتأليف", "الإخفاء والكتمان", "الترجيح بين الأقوال", "ترك القراءة"],
        correct: 0,
        explanation: "الجمع في اللغة يدل على ضمّ المتفرق وتأليفه."
      },
      {
        question: "ما المقصود بجمع القراءات اصطلاحًا في هذا الدرس؟",
        options: ["أداء أوجه القراءات بطريقة مضبوطة في موضع أو مقطع", "قراءة رواية واحدة فقط بلا انتقال", "تفسير معاني الآيات", "حفظ أسماء القراء فقط"],
        correct: 0,
        explanation: "المقصود هو أداء الأوجه المتعددة مع حفظ كل وجه على طريقته المروية."
      },
      {
        question: "ما الهدف العملي من جمع القراءات؟",
        options: ["تيسير حفظ واستحضار الأوجه أثناء التلاوة", "إلغاء الفروق بين الرواة", "الاكتفاء بالقراءة الصامتة", "تقديم الرأي الشخصي على الرواية"],
        correct: 0,
        explanation: "الجمع يعين الطالب على استحضار أوجه القراءات المتعددة بترتيب واضح."
      },
      {
        question: "أي شرط ينبغي أن يسبق الجمع بين القراءات؟",
        options: ["إتقان كل قراءة إفرادًا", "ترك ضبط الأصول", "البدء بالأوجه النادرة فقط", "تغيير ترتيب الرواة بحسب الرغبة"],
        correct: 0,
        explanation: "الإفراد قبل الجمع أصل مهم حتى لا ينتقل الطالب إلى الجمع قبل رسوخ الروايات."
      },
      {
        question: "ما الخلل المقصود بالرواية المركّبة الممنوعة؟",
        options: ["خلط أوجه لا تجتمع في رواية مأثورة", "تكرار الآية للتدريب", "فتح كتب القراءات", "قراءة وجه واحد بإتقان"],
        correct: 0,
        explanation: "التركيب الممنوع هو جمع أوجه بطريقة تخالف الرواية المنقولة."
      },
      {
        question: "في مثال الآية، بأي وجه تبدأ كلمة مُوسَىٰ وجوبًا؟",
        options: ["الفتح لقالون", "التقليل لورش", "الإمالة لحمزة", "الصلة"],
        correct: 0,
        explanation: "الخطوة الأولى هي البداية بوجه قالون، وهو الفتح."
      },
      {
        question: "بعد الفتح في كلمة مُوسَىٰ، ما الوجه التالي؟",
        options: ["التقليل", "السكون", "صلة ميم الجمع", "ترك الكلمة"],
        correct: 0,
        explanation: "بعد الفتح ينتقل الطالب إلى وجه التقليل وفق ترتيب الأوجه المذكور."
      },
      {
        question: "لماذا يُقدّم التقليل قبل الإمالة في كلمة مُوسَىٰ؟",
        options: ["لأن ورشًا متقدم في ترتيب الرواة على حمزة", "لأن الإمالة ليست قراءة", "لأن التقليل خاص بميم الجمع", "لأن الكلمة لا خلاف فيها"],
        correct: 0,
        explanation: "التقليل لورش، ورواية ورش متقدمة في الترتيب على رواية حمزة."
      },
      {
        question: "لمن ذُكر وجه الإمالة في كلمة مُوسَىٰ؟",
        options: ["لحمزة والكسائي وخلف العاشر", "لقالون فقط", "لورش فقط", "لجميع الرواة بلا ترتيب"],
        correct: 0,
        explanation: "الخطوة الثالثة تنص على الإمالة لحمزة والكسائي وخلف العاشر."
      },
      {
        question: "متى يُنتقل إلى ميم الجمع في كلمة رَسُولَكُمْ؟",
        options: ["بعد الانتهاء من كل أوجه كلمة مُوسَىٰ", "قبل البدء بوجه الفتح", "بعد سؤال واحد من الاختبار", "لا يُنتقل إليها مطلقًا"],
        correct: 0,
        explanation: "الخطوة الرابعة تكون بعد تمام أوجه كلمة مُوسَىٰ، ثم الانتقال إلى ميم الجمع."
      }
    ];

    let currentQuestion = 0;
    let score = 0;
    let answered = false;
    let shuffledOptions = [];

    const questionEl = document.getElementById("question");
    const answersEl = document.getElementById("answers");
    const feedbackEl = document.getElementById("feedback");
    const nextBtn = document.getElementById("next-btn");
    const progressText = document.getElementById("progress-text");
    const scoreText = document.getElementById("score-text");
    const progressBar = document.getElementById("progress-bar");
    const quizContent = document.getElementById("quiz-content");
    const result = document.getElementById("result");
    const resultScore = document.getElementById("result-score");
    const resultTitle = document.getElementById("result-title");
    const resultMessage = document.getElementById("result-message");
    const restartBtn = document.getElementById("restart-btn");

    function shuffleAnswers(item) {
      const optionsWithStatus = item.options.map((option, index) => ({
        text: option,
        isCorrect: index === item.correct
      }));

      for (let index = optionsWithStatus.length - 1; index > 0; index -= 1) {
        const randomIndex = Math.floor(Math.random() * (index + 1));
        [optionsWithStatus[index], optionsWithStatus[randomIndex]] = [optionsWithStatus[randomIndex], optionsWithStatus[index]];
      }

      return optionsWithStatus;
    }

    function renderQuestion() {
      const item = questions[currentQuestion];
      answered = false;
      shuffledOptions = shuffleAnswers(item);
      questionEl.textContent = item.question;
      answersEl.innerHTML = "";
      feedbackEl.textContent = "اختر إجابة لعرض التعليل.";
      nextBtn.disabled = true;
      nextBtn.textContent = currentQuestion === questions.length - 1 ? "عرض النتيجة" : "التالي";

      progressText.textContent = `السؤال ${arabicNumber.format(currentQuestion + 1)} من ${arabicNumber.format(questions.length)}`;
      scoreText.textContent = `النتيجة: ${arabicNumber.format(score)}`;
      progressBar.style.width = `${((currentQuestion + 1) / questions.length) * 100}%`;

      shuffledOptions.forEach((option, index) => {
        const button = document.createElement("button");
        button.className = "answer";
        button.type = "button";
        button.textContent = option.text;
        button.addEventListener("click", () => selectAnswer(index));
        answersEl.appendChild(button);
      });
    }

    function selectAnswer(index) {
      if (answered) return;
      answered = true;

      const item = questions[currentQuestion];
      const answerButtons = [...answersEl.querySelectorAll(".answer")];
      const isCorrect = shuffledOptions[index].isCorrect;

      if (isCorrect) score += 1;

      answerButtons.forEach((button, buttonIndex) => {
        button.disabled = true;
        if (shuffledOptions[buttonIndex].isCorrect) button.classList.add("correct");
        if (buttonIndex === index && !isCorrect) button.classList.add("wrong");
      });

      feedbackEl.innerHTML = isCorrect
        ? `<strong>إجابة صحيحة.</strong> ${item.explanation}`
        : `<strong>إجابة غير صحيحة.</strong> ${item.explanation}`;

      scoreText.textContent = `النتيجة: ${arabicNumber.format(score)}`;
      nextBtn.disabled = false;
    }

    function showResult() {
      quizContent.style.display = "none";
      result.style.display = "block";
      resultScore.textContent = `${arabicNumber.format(score)} / ${arabicNumber.format(questions.length)}`;

      if (score >= 9) {
        resultTitle.textContent = "ممتاز، فهمك متين.";
        resultMessage.textContent = "أحسنت في ضبط التعريف والشروط وتسلسل الخطوات العملية.";
      } else if (score >= 7) {
        resultTitle.textContent = "جيد جدًا، بقيت لمسات يسيرة.";
        resultMessage.textContent = "راجع ترتيب الأوجه في المثال وستزداد ثقتك في التطبيق.";
      } else if (score >= 5) {
        resultTitle.textContent = "بداية طيبة تحتاج مراجعة.";
        resultMessage.textContent = "أعد قراءة قسم الطريقة خطوة خطوة، ثم جرّب الاختبار مرة أخرى.";
      } else {
        resultTitle.textContent = "لا بأس، العلم يُبنى بالتكرار.";
        resultMessage.textContent = "ابدأ بالمقدمة والشروط، ثم ركّز على تسلسل موسى ورسولكم قبل الإعادة.";
      }
    }

    nextBtn.addEventListener("click", () => {
      if (currentQuestion === questions.length - 1) {
        showResult();
        return;
      }

      currentQuestion += 1;
      renderQuestion();
    });

    restartBtn.addEventListener("click", () => {
      currentQuestion = 0;
      score = 0;
      quizContent.style.display = "block";
      result.style.display = "none";
      renderQuestion();
    });

    renderQuestion();
