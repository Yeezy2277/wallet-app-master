export interface AppLocale {
  lang: string
  errors: {
    loginRequired: string
    loginRequiredDescription: string
    wrongPassword: string
    wrongPin: string
    invalidCode: string
    codeIsDifferent: string
    common: string
    tryAgain: string
    lessThanZero: string
    lessThanMin: (m: string) => string
    address: string
    notEnough: string
    emailExists: string
    invalidPassword: string
  }
  common: {
    currency: string
    save: string
    send: string
    thanks: string
    all: string
    yes: string
    no: string
    sure: string
    cancel: string
    success: string
    done: string
    showAll: string
    seconds: string
    copied: string
  }
  settings: {
    title: string
    lang: string
    faceId: string
    touchId: string
    notifications: string
    support: string
    pinCode: string
    signOut: string
  }
  transaction: {
    title: string
    in: string
    out: string
    address: string
    amount: string
    withdrawal: string
    sendAll: string
    myAddress: string
    copy: string
    success: string
    goBack: string
    titles: {
      in: string
      out: string
      reward: string
      reinvest: string
      delegate: string
      undelegate: string
    }
  }
  transactionDetails: {
    title: string
    type: string
    transfer: string
    reward: string
    delegate: string
    undelegate: string
    reinvest: string
    recepient: string
    sender: string
    id: string
    timestamp: string
    comission: string
  }
  account: {
    title: string
    wallet: string
    email: string
    telegram: string
    changePassword: string
  }
  structure: {
    title: string
    members: string
    levels: string
    income: string
  }
  login: {
    login: string
    wait: string
    signIn: string
    signUp: string
    title: {
      signIn: string
      signUp: string
    }
    fa: string
    biometric: {
      cancel: string
      enter: string
      biometric: string
      create: string
      confirm: string
      forgot: string
      reset: string
    }
    email: string
    password: string
    confirmPassword: string
    changeAuth: {
      signIn: string
      signUp: string
      create: string
    }
    stepOneTitle: string
    stepOneInfo: string
    stepTwoTitle: string
    stepTwoInfo: string
    continue: string
    step: string
    phoneNumberPlaceholder: string
    smsCodePlaceholder: string
  }
  home: {
    balance: string
    account: string
    transfers: string
    structure: string
    lastTransactions: string
    coins: string
    coinsSelect: string
    coinsSearch: string
  }
  postmining: {
    title: string
    rules: string
    reinvest: string
    reinvestDescription: string
    reinvestComission: string
    reinvestValue: string
    currentDayPercent: string
    startDayPercent: string
    structureCoeff: string
    savingsCoeff: string
    correctionCoeff: string
    dayFromLastTransaction: string
  }
  maintenance: {
    title: string
    message: string
  }
  history: {
    title: string
  }
  support: {
    title: string
    theme: string
    question: string
    describe: string
    button: string
  }
  pinCode: {
    title: string
    description: string
    inputText: string
    editPin: string
    oldPin:string
    newPin:string
    wait: string
    deletePin: string
    addPinMessage:string
    deletePinMessage:string
    buttonAdd: string
    buttonDelete: string
  }
  filters: {
    title: string
    transactionType: string
    all: string
    sent: string
    received: string
    period: string
    periodFrom: string
    periodTo: string
    button: string
    notFound: string
    tryToChange: string
    changeFilter: string
  }
}

export const STRINGS: { [key: string]: AppLocale } = {
  ru: {
    lang: 'Русский',
    maintenance: {
      title: 'На сервере\nпроводятся работы',
      message: 'Пожалуйста, зайдите позже',
    },
    errors: {
      loginRequired: 'Необходимо выполнить вход',
      loginRequiredDescription: 'Время сессии истекло',
      wrongPassword: 'Неправильный пароль',
      wrongPin: "Неправильно введён старый ПИН-код.",
      codeIsDifferent: 'Коды не совпадают',
      common: 'Что-то пошло не так',
      tryAgain: 'Попробуйте еще раз',
      invalidCode: 'Неправильный код',
      lessThanZero: 'Значение не может быть меньше 0',
      lessThanMin: (min: string) => `Минимальное значение ${min}`,
      address: 'Некорректный адрес получателя',
      notEnough: 'Недостаточно средств',
      emailExists: 'Этот email уже занят',
      invalidPassword: 'Неверное сочетание email / пароль',
    },
    common: {
      currency: 'Currency',
      save: 'Сохранить',
      success: 'Успешно',
      send: 'Отправить',
      thanks: 'Спасибо',
      all: 'Все',
      yes: 'Да',
      no: 'Нет',
      sure: 'Вы уверены?',
      cancel: 'Отмена',
      done: 'Выполнено',
      showAll: 'Показать все',
      seconds: 'Сек.',
      copied: 'Скопировано',
    },
    support: {
      title: 'Поддержка',
      theme: 'Тема обращения',
      question: 'Ваш вопрос',
      describe: 'Опишите проблему...',
      button: 'Отправить',
    },
    pinCode: {
      title: 'Настройки ПИН-кода',
      description: 'Здесь вы можете установить ПИН-код, или же удалить его',
      wait: 'Подождите пожалуйста. Загружаются данные с сервера',
      inputText: 'ПИН-код (4 цифры)',
      editPin: 'Изменить ПИН-код',
      oldPin: 'Старый ПИН-код',
      newPin: 'Новый ПИН-код',
      deletePin: 'Удалить ПИН-код',
      addPinMessage:'Добавить ПИН-код (4 цифры)',
      deletePinMessage:'ПИН-код не установлен',
      buttonAdd: 'Добавить ПИН-код',
      buttonDelete: 'Удалить ПИН-код',
    },
    transactionDetails: {
      title: 'О транзакции',
      type: 'Тип транзакции',
      sender: 'Отправитель',
      transfer: 'Перевод средств',
      reward: 'Вознаграждение',
      delegate: 'Делегирование',
      undelegate: 'Возврат с делегирования',
      reinvest: 'Реинвест',
      recepient: 'Получатель',
      id: 'Номер операции',
      timestamp: 'Время операции',
      comission: 'Комиссия',
    },
    filters: {
      title: 'Фильтр',
      transactionType: 'Тип транзакции',
      all: 'Все',
      sent: 'Отправления',
      received: 'Получения',
      period: 'Выберите период',
      periodFrom: 'От',
      periodTo: 'До',
      button: 'Показать результат',
      notFound: 'Ничего не найдено',
      tryToChange: 'Попробуйте изменть параметры поиска',
      changeFilter: 'Изменить фильтр',
    },
    transaction: {
      sendAll: 'Отправить всё',
      title: 'Переводы',
      in: 'Получить',
      out: 'Отправить',
      address: 'Адрес получателя',
      amount: 'Сумма перевода',
      withdrawal: 'Сумма списания',
      myAddress: 'Ваш адрес',
      copy: 'Скопировать адрес',
      success: 'Перевод успешно выполнен',
      goBack: 'Вернуться на главную',
      titles: {
        in: 'Получено',
        out: 'Отправлено',
        reward: 'Вознаграждение',
        reinvest: 'Посмайнинг',
        delegate: 'Делегирование',
        undelegate: 'Возврат с делегирования',
      },
    },
    account: {
      title: 'Аккаунт',
      wallet: 'Ваш кошелек',
      email: 'Ваш e-mail',
      telegram: 'Ваш Telegram',
      changePassword: 'Изменить пароль',
    },
    structure: {
      title: 'Структура',
      members: 'Количество участников',
      levels: 'Количество уровней',
      income: 'Объем структуры',
    },
    login: {
      login: 'Войти',
      wait: 'Подождите',
      biometric: {
        cancel: 'Отключить быстрый вход',
        enter: 'Введите PIN-код для входа',
        biometric: 'Touch ID / Face ID',
        create: 'Создайте PIN-код',
        confirm: 'Введите PIN-код для подтверждения ',
        forgot: 'Забыли код?',
        reset: 'Сбросить код и выйти?',
      },
      fa: 'Код 2FA',
      signIn: 'Войти',
      signUp: 'Зарегистрироваться',
      title: {
        signIn: 'Вход',
        signUp: 'Регистрация',
      },
      email: 'Ваш Email',
      password: 'Пароль',
      confirmPassword: 'Повторите пароль',
      changeAuth: {
        signIn: 'Еще нет аккаунта?',
        signUp: 'Уже есть аккаунт?',
        create: 'Создать',
      },
      stepOneTitle: 'Вход',
      stepOneInfo: 'Чтобы войти в аккаунт, введите номер телефона',
      stepTwoTitle: 'Введите код',
      stepTwoInfo: 'На ваш номер телефона отправлено сообщение с кодом',
      continue: 'Продолжить',
      step: 'Шаг',
      phoneNumberPlaceholder: 'Номер телефона',
      smsCodePlaceholder: 'Код',
    },
    settings: {
      title: 'Настройки',
      lang: 'Язык',
      faceId: 'Face Id',
      touchId: 'Touch Id',
      notifications: 'Уведомления',
      support: 'Поддержка',
      pinCode: 'Пинкод',
      signOut: 'Выйти',
    },
    home: {
      balance: 'Ваш баланс',
      account: 'Аккаунт',
      transfers: 'Переводы',
      structure: 'Структура',
      lastTransactions: 'Последние транзакции',
      coins: 'Монеты',
      coinsSelect: 'Выбор монеты',
      coinsSearch: 'Название монеты',
    },
    postmining: {
      title: 'Посмайнинг',
      rules: 'Условия посмайнинга',
      reinvest: 'Реинвест',
      reinvestDescription:
        'Реинвест позволяет автоматически получать посмайнинг по достижению заданной суммы. Для активации реинвеста, просто введите любую сумму больше 0.02 OURO.',
      reinvestComission: 'Комиссия за реинвест',
      reinvestValue: 'Сумма реинвеста',
      currentDayPercent: 'Текущий дневной процент',
      startDayPercent: 'Стартовый дневной процент',
      structureCoeff: 'Коэффициент структуры',
      savingsCoeff: 'Коэффициент накопления',
      correctionCoeff: 'Коэффициент коррекции',
      dayFromLastTransaction: 'Дней с последней транзакции',
    },
    history: {
      title: 'История',
    },
  },
  en: {
    lang: 'English',
    maintenance: {
      title: 'Server is on\nmaintenance',
      message: 'Please come back later',
    },
    errors: {
      loginRequired: 'Login required',
      loginRequiredDescription: 'Session expired',
      wrongPassword: 'Invalid password',
      wrongPin: "Invalid old PIN-code",
      common: 'Something went wrong',
      codeIsDifferent: 'Codes are different',
      tryAgain: 'Please try again',
      invalidCode: 'Invalid code',
      lessThanZero: 'Value cannot be less than 0',
      lessThanMin: (min: string) => `Min value is ${min}`,
      address: 'Invalid address',
      notEnough: 'Insufficient funds',
      emailExists: 'This email is already registered',
      invalidPassword: 'Invalid pair email / password',
    },
    transactionDetails: {
      title: 'Transaction info',
      type: 'Transaction type',
      sender: 'Sender',
      transfer: 'Funds transfer',
      reward: 'Reward',
      delegate: 'Delegate',
      undelegate: 'Undelegate',
      reinvest: 'Reinvest',
      recepient: 'Recipient',
      id: 'Transaction id',
      timestamp: 'Transaction date',
      comission: 'Commission',
    },
    common: {
      currency: 'Валюта',
      copied: 'Copied',
      save: 'Save',
      success: 'Success',
      send: 'Send',
      thanks: 'Thanks',
      all: 'All',
      yes: 'Yes',
      no: 'No',
      sure: 'Are you sure?',
      cancel: 'Cancel',
      done: 'Done',
      showAll: 'Show all',
      seconds: 'Sec.',
    },
    support: {
      title: 'Support',
      theme: 'Subject',
      question: 'Your question',
      describe: 'Your problem...',
      button: 'Send',
    },
    pinCode: {
      title: 'PIN-Code settings',
      wait: 'Wait please. Loading data from the server',
      description: 'Here you can set the PIN-code, or delete it',
      inputText: 'PIN-Code (4 digits)',
      editPin: 'Enter your new PIN-code',
      oldPin: 'Old PIN-code',
      newPin: 'New PIN-code',
      addPinMessage:'Add PIN-code (4 digits)',
      deletePinMessage:'PIN-code is not used',
      deletePin: 'Delete your PIN-Code',
      buttonAdd: 'Add PIN-Code',
      buttonDelete: 'Delete PIN-Code',
    },
    filters: {
      title: 'Filters',
      transactionType: 'Transaction type',
      all: 'All',
      sent: 'Sent',
      received: 'Received',
      period: 'Period',
      periodFrom: 'From',
      periodTo: 'To',
      button: 'Show result',
      notFound: 'Nothing found',
      tryToChange: 'Try different filters',
      changeFilter: 'Set filters',
    },
    transaction: {
      sendAll: 'Send all',
      title: 'Transactions',
      in: 'Receive',
      out: 'Send',
      address: 'Recipient address',
      amount: 'Transaction amount',
      withdrawal: 'Withdrawal amount',
      myAddress: 'Your address',
      copy: 'Copy address',
      success: 'Transaction succeeded',
      goBack: 'Back to main screen',
      titles: {
        in: 'Received',
        out: 'Sent',
        reward: 'Reward',
        reinvest: 'Posmined',
        delegate: 'Delegate',
        undelegate: 'Undelegate',
      },
    },
    account: {
      title: 'Account',
      wallet: 'Your wallet',
      email: 'Your e-mail',
      telegram: 'Your Telegram',
      changePassword: 'Change password',
    },
    structure: {
      title: 'Structure',
      members: 'Members count',
      levels: 'Levels count',
      income: 'Structure volume',
    },
    login: {
      fa: '2FA code',
      login: 'Sign In',
      wait: 'Wait for',
      biometric: {
        create: 'Create PIN code',
        confirm: 'Confirm PIN code',
        cancel: 'Cancel biometric auth',
        enter: 'Enter your PIN code',
        biometric: 'Touch ID / Face ID',
        forgot: 'Forgot PIN?',
        reset: 'Sign out and reset PIN?',
      },
      signIn: 'Sign In',
      signUp: 'Sign Up',
      title: {
        signIn: 'Sign In',
        signUp: 'Sign Up',
      },
      email: 'Your Email',
      password: 'Password',
      confirmPassword: 'Confirm password',
      changeAuth: {
        signIn: 'No account?',
        signUp: 'Already have an account?',
        create: 'Create',
      },
      stepOneTitle: 'Login',
      stepOneInfo: 'Enter your phone number to sign in',
      stepTwoTitle: 'Enter a code',
      stepTwoInfo: 'A message with a code has been sent to your phone number',
      continue: 'Continue',
      step: 'Step',
      phoneNumberPlaceholder: 'Phone number',
      smsCodePlaceholder: 'Code',
    },
    settings: {
      title: 'Settings',
      lang: 'Language',
      faceId: 'Face Id',
      touchId: 'Touch Id',
      notifications: 'Notifications',
      support: 'Support',
      pinCode: 'Pin Code',
      signOut: 'Sign Out',
    },
    home: {
      balance: 'Your balance',
      account: 'Account',
      transfers: 'Transactions',
      structure: 'Structure',
      lastTransactions: 'Recent transactions',
      coins: 'Coins',
      coinsSelect: 'Coin selection',
      coinsSearch: 'Coin name',
    },
    postmining: {
      title: 'Posmining',
      rules: 'Posmining conditions',
      reinvest: 'Reinvest',
      reinvestDescription:
        'Reinvest automatically runs Posining to achieve a given amount. To activate the reinvestment, simply enter any amount greater than 0.02 OURO.',
      reinvestComission: 'Reinvest commission',
      reinvestValue: 'Reinvest amount',
      currentDayPercent: 'Current daily percent',
      startDayPercent: 'Start daily percent',
      structureCoeff: 'Structure coefficient',
      savingsCoeff: 'Savings coefficient',
      correctionCoeff: 'Correction coefficient',
      dayFromLastTransaction: 'Days from last transaction',
    },
    history: {
      title: 'History',
    },
  },
}
