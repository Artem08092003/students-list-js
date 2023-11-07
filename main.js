(() => {
  // Этап 1.
  // Получаем элементы формы
  const form = document.getElementById("form");
  const inputName = document.getElementById("name");
  const inputSurname = document.getElementById("surname");
  const inputMidlleName = document.getElementById("middleName");
  const inputBirthdate = document.getElementById("birthdate");
  const inputYearEducation = document.getElementById("yearEducation");
  const inputFaculty = document.getElementById("faculty");

  // Получаем элементы для отображения сообщений об ошибках
  const errorMessageName = document.getElementById("error-name");
  const errorMessageSurname = document.getElementById("error-surname");
  const errorMessageFaculty = document.getElementById("error-faculty");

  // Получаем кнопки сортировки
  const sortBtn = document.querySelectorAll(".sort__btn");
  const sortBtnReset = document.querySelector(".sort__btn--reset");

  // Получаем текущую дату
  const currentDate = new Date()

  // Получаем день
  const dayNow = currentDate.getDate();

  // Получаем месяц (нумерация месяцев начинается с 0)
  const monthNow = currentDate.getMonth() + 1;

  // Получаем год
  const yearNow = currentDate.getFullYear();

  // Получаем максимальную дату в формате ISO для ограничения выбора даты рождения
  const maxDate = currentDate.toISOString().split("T")[0];
  inputBirthdate.max = maxDate;

  // Устанавливаем максимальное значение для выбора года образования
  inputYearEducation.max = yearNow;


  // Этап 2. массив объектов студентов, в него объекты студентов.
  // данный метод вернет входящую строку в виде данных
  function jsonToData(data) {
    return JSON.parse(data);
  };

  // данный метод вернет данные из localstorage
  function getCartData() {
    return localStorage.getItem("students");
  };

  // данный метод вернет входящие данные в виде строки
  function dataToJson(data) {
    return JSON.stringify(data);
  };

  //данный метод запишет наши данные в localstorage
  function setCartData(data) {
    localStorage.setItem("students", data);
  };

  // функция для добавление новый индификатор для обьекта в массиве
  function addObjId(array) {
    for (let i = 0; i < array.length; i++) {
      array[i].id = i + 1;
    };

    return array.length + 1;
  };

  // массив объектов студентов, в него объекты студентов.
  const studentsList = jsonToData(getCartData()) || [{
    id: null,
    name: 'Артем',
    surname: 'Иванов',
    middlename: 'Александрович',
    birthdate: new Date("2000-01-01").toISOString().split("T")[0],
    yearEducation: '2023',
    faculty: 'Гуманитарных наук',
  },
  {
    id: null,
    name: 'Екатерина',
    surname: 'Смирнова',
    middlename: 'Алексеевна',
    birthdate: new Date("2001-02-03").toISOString().split("T")[0],
    yearEducation: '2022',
    faculty: 'Естественных наук',
  },
  {
    id: null,
    name: 'Иван',
    surname: 'Петров',
    middlename: 'Сергеевич',
    birthdate: new Date("1999-05-10").toISOString().split("T")[0],
    yearEducation: '2021',
    faculty: 'Социальных наук',
  },
  {
    id: null,
    name: 'Александра',
    surname: 'Соколова',
    middlename: 'Дмитриевна',
    birthdate: new Date("2002-07-15").toISOString().split("T")[0],
    yearEducation: '2018',
    faculty: 'Искусств',
  },
  {
    id: null,
    name: 'Максим',
    surname: 'Ковалев',
    middlename: 'Андреевич',
    birthdate: new Date("1998-12-20").toISOString().split("T")[0],
    yearEducation: '2020',
    faculty: 'Инженерии',
  },
  {
    id: null,
    name: 'Анна',
    surname: 'Васильева',
    middlename: 'Игоревна',
    birthdate: new Date("2003-04-25").toISOString().split("T")[0],
    yearEducation: '2023',
    faculty: 'Информационных технологий',
  },
  {
    id: null,
    name: 'Дмитрий',
    surname: 'Николаев',
    middlename: 'Алексеевич',
    birthdate: new Date("2000-09-05").toISOString().split("T")[0],
    yearEducation: '2022',
    faculty: 'Экономики и бизнеса',
  },
  {
    id: null,
    name: 'Елена',
    surname: 'Козлова',
    middlename: 'Ивановна',
    birthdate: new Date("2001-11-12").toISOString().split("T")[0],
    yearEducation: '2010',
    faculty: 'Медицины',
  }];

  addObjId(studentsList);

  // Флаг для определения столбца сортировки
  let sortColumnFlag = '';
  // Флаг для определения направления сортировки (по умолчанию - по возрастанию)
  let sortDirFlag = true;

  // функция удаление элемента обьекта в массиве
  function studentRemoveObj(array, student) {
    const index = array.findIndex(item => item.id === student.id);
    if (index >= 0) {
      array.splice(index, 1);
      // удаляет конкретный элемент в массиве при срабатывании функции
      setCartData(dataToJson(array));
    }
  }


  // Этап 3. функцию вывода одного студента в таблицу, по аналогии с тем, как вы делали вывод одного дела в модуле 8. Функция должна вернуть html элемент с информацией и пользователе.У функции должен быть один аргумент - объект студента.
  function getStudentItem(studentObj) {
    const item = document.createElement("li");
    const btnDeleteStudent = document.createElement("button");
    const listSub = document.createElement("ul");
    const itemSubName = document.createElement("li");
    const itemSubFaculty = document.createElement("li");
    const itemSubBirthdate = document.createElement("li");
    const itemSubYearEducation = document.createElement("li");

    // Добавляем классы стилей к элементам
    item.classList.add("item__not-first");
    btnDeleteStudent.classList.add("btn__delete-student");
    listSub.classList.add("title__list", "list-reset", "list__not-first");
    itemSubName.classList.add("item", "item-not-first");
    itemSubBirthdate.classList.add("item", "item-not-first");
    itemSubYearEducation.classList.add("item", "item-not-first");
    itemSubFaculty.classList.add("item", "item-not-first");

    // Форматируем и устанавливаем текстовое содержимое для itemSubName
    const nameInItem = studentObj.name.trim().charAt(0).toUpperCase() + studentObj.name.trim().slice(1);
    const surnameInItem = studentObj.surname.trim().charAt(0).toUpperCase() + studentObj.surname.trim().slice(1);
    const middleNameInItem = studentObj.middlename.trim().charAt(0).toUpperCase() + studentObj.middlename.trim().slice(1);
    itemSubName.textContent = surnameInItem + " " + nameInItem + " " + middleNameInItem;

    // Форматируем и устанавливаем текстовое содержимое для itemSubBirthdate
    // const splitDateBirthdate = studentObj.birthdate.toISOString().split("T")[0];
    const splitBirthdate = studentObj.birthdate.split("-");
    const reverseBirthdate = splitBirthdate.reverse();
    const joinBirthdate = reverseBirthdate.join(".");
    const birthdate = new Date(studentObj.birthdate);
    const birthYear = birthdate.getFullYear();
    const birthMonth = birthdate.getMonth() + 1;
    const birthDay = birthdate.getDate();
    let age = yearNow - birthYear;
    if (monthNow < birthMonth || (monthNow === birthMonth && dayNow < birthDay)) {
      age = age - 1;
    }
    itemSubBirthdate.textContent = `${joinBirthdate} (${age} лет)`;

    // Форматируем и устанавливаем текстовое содержимое для itemSubYearEducation
    const endYearEducation = parseInt(studentObj.yearEducation) + 4;
    let courseYearEducation;
    courseYearEducation = ((yearNow + 4) < endYearEducation && monthNow < 10 || (yearNow + 3) < endYearEducation && monthNow > 9) ? 1
      : ((yearNow + 3) < endYearEducation && monthNow < 10 || (yearNow + 2) < endYearEducation && monthNow > 9) ? 2
        : ((yearNow + 2) < endYearEducation && monthNow < 10 || (yearNow + 1) < endYearEducation && monthNow > 9) ? 3
          : ((yearNow + 1) < endYearEducation && monthNow < 10 || yearNow < endYearEducation && monthNow > 9) ? 4
            : "закончил";
    itemSubYearEducation.textContent = `${studentObj.yearEducation} - ${endYearEducation} (${courseYearEducation} курс)`;

    // Устанавливаем текстовое содержимое для itemSubFaculty
    const facultyInItem = studentObj.faculty.trim().charAt(0).toUpperCase() + studentObj.faculty.trim().slice(1);
    itemSubFaculty.textContent = facultyInItem;

    // Добавляем элементы в соответствующие родительские элементы
    listSub.append(itemSubName);
    listSub.append(itemSubFaculty);
    listSub.append(itemSubBirthdate);
    listSub.append(itemSubYearEducation);
    item.append(listSub);
    item.append(btnDeleteStudent);

    return {
      item,
      listSub,
      itemSubName,
      itemSubFaculty,
      itemSubBirthdate,
      itemSubYearEducation,
      btnDeleteStudent
    };
  }


  const listAddStudents = document.getElementById("list_add_students");

  // Этап 4. Функция для отрисовки таблицы студентов на основе массива студентов
  function renderStudentsTable(studentsArray) {
    // Очищаем содержимое элемента listAddStudents
    listAddStudents.innerHTML = "";

    // Создаем копию массива студентов
    let copyStudentsArray = [...studentsArray];

    // Сортируем копию массива студентов по заданному столбцу
    copyStudentsArray = copyStudentsArray.sort(function (a, b) {
      let sort = a[sortColumnFlag] < b[sortColumnFlag];

      // Если направление сортировки - по убыванию, меняем порядок сортировки
      if (sortDirFlag == false) {
        sort = a[sortColumnFlag] > b[sortColumnFlag]
      }

      if (sort) return -1;
    })

    // Для каждого студента в отсортированном массиве
    copyStudentsArray.forEach(student => {
      // Получаем элемент студента с помощью функции getStudentItem
      let studentItem = getStudentItem(student);

      // кнопка удаления студента обработчик события
      studentItem.btnDeleteStudent.addEventListener("click", function () {
        if (confirm("Вы уверены?")) {
          studentItem.item.remove();
          studentRemoveObj(studentsArray, student);
        }
      });

      // Добавляем элемент студента в элемент listAddStudents
      listAddStudents.append(studentItem.item);

      // Возвращаем элемент студента
      return studentItem;
    });
  };

  // сразу отрисовываем таблицу тк есть встроенный элементы в массиве
  renderStudentsTable(studentsList);


  // Этап 5. К форме добавления студента слушатель события отправки формы, в котором будет проверка введенных данных.Если проверка пройдет успешно, добавляйте объект с данными студентов в массив студентов и запуска функцию отрисовки таблицы студентов, созданную на этапе 4.
  form.addEventListener("submit", (e) => {
    e.preventDefault();

    // Проверяем введенные данные
    if (inputName.value.trim() === "") {
      return errorMessageName.textContent = "Введите имя";
    } else {
      errorMessageName.textContent = "";
    };

    if (inputSurname.value.trim() === "") {
      return errorMessageSurname.textContent = "Введите фамилю";
    } else {
      errorMessageSurname.textContent = "";
    };

    if (inputFaculty.value.trim() === "") {
      return errorMessageFaculty.textContent = "Введите названия факультета";
    } else {
      errorMessageFaculty.textContent = "";
    };

    // Создаем объект с данными студента
    let obj = {
      id: addObjId(studentsList),
      name: inputName.value.trim().charAt(0).toUpperCase() + inputName.value.trim().slice(1),
      surname: inputSurname.value.trim().charAt(0).toUpperCase() + inputSurname.value.trim().slice(1),
      middlename: inputMidlleName.value.trim().charAt(0).toUpperCase() + inputMidlleName.value.trim().slice(1),
      birthdate: new Date(inputBirthdate.value).toISOString().split("T")[0],
      yearEducation: inputYearEducation.value.trim().charAt(0).toUpperCase() + inputYearEducation.value.trim().slice(1),
      faculty: inputFaculty.value.trim().charAt(0).toUpperCase() + inputFaculty.value.trim().slice(1),
    }

    // Добавляем объект студента в начало массива studentsList
    studentsList.unshift(obj);

    // Отрисовываем таблицу студентов
    renderStudentsTable(studentsList);

    // Очищаем значения полей ввода
    inputName.value = "";
    inputSurname.value = "";
    inputMidlleName.value = "";
    inputBirthdate.value = "";

    //записываем массив в localstorage
    setCartData(dataToJson(studentsList));
  });


  // Этап 6. Добавляем обработчики событий для кнопок сортировки
  sortBtn[0].addEventListener('click', function () {
    // Устанавливаем флаг сортировки по фамилии и меняем направление сортировки
    sortColumnFlag = 'surname';
    sortDirFlag = !sortDirFlag;

    // Отрисовываем таблицу студентов с обновленной сортировкой
    renderStudentsTable(studentsList);
  });

  sortBtn[1].addEventListener('click', function () {
    // Устанавливаем флаг сортировки по факультету и меняем направление сортировки
    sortColumnFlag = 'faculty';
    sortDirFlag = !sortDirFlag;

    // Отрисовываем таблицу студентов с обновленной сортировкой
    renderStudentsTable(studentsList);
  });

  sortBtn[2].addEventListener('click', function () {
    // Устанавливаем флаг сортировки по дате рождения и меняем направление сортировки
    sortColumnFlag = 'birthdate';
    sortDirFlag = !sortDirFlag;

    // Отрисовываем таблицу студентов с обновленной сортировкой
    renderStudentsTable(studentsList);
  });

  sortBtn[3].addEventListener('click', function () {
    // Устанавливаем флаг сортировки по году обучения и меняем направление сортировки
    sortColumnFlag = 'yearEducation';
    sortDirFlag = !sortDirFlag;

    // Отрисовываем таблицу студентов с обновленной сортировкой
    renderStudentsTable(studentsList);
  });

  // функции сброса сортировка массива
  function sortReset(studentsArray) {
    listAddStudents.innerHTML = "";

    let originalStudentsArray = [...studentsArray];

    originalStudentsArray.forEach(student => {
      let studentItem = getStudentItem(student);

      // кнопка удаления студента обработчик события
      studentItem.btnDeleteStudent.addEventListener("click", function () {
        if (confirm("Вы уверены?")) {
          studentItem.item.remove();
          studentRemoveObj(studentsArray, student);
        }
      });

      listAddStudents.append(studentItem.item);
      return studentItem;
    });
  };

  // Добавляем обработчик события для кнопки сброса сортировки
  sortBtnReset.addEventListener('click', function () {
    // Сбрасываем сортировку и отрисовываем таблицу студентов с исходным порядком
    sortReset(studentsList);
  });


  // Этап 7. функцию фильтрации массива студентов и события для элементов формы.
  // Получаем элемент формы фильтрации по его идентификатору
  const filterForm = document.getElementById("filter__form");

  // Получаем элементы фильтра по их идентификаторам
  const filterName = document.getElementById("filterInputName");
  const filterFaculty = document.getElementById("filterInputFaculty");
  const filterYearEducationfirst = document.getElementById("filterInputYearEducationFirst");
  const filterYearEducationLast = document.getElementById("filterInputYearEducationLast");

  //Получаем элемент кнопка очистить поле фильтра
  const filterBtnRemove = document.getElementById("filterResetBtn");

  // Получаем коллекцию элементов с классом "text-error-filter"
  const textErrorFilter = document.querySelectorAll(".text-error-filter");

  // Получаем коллекцию элементов с классом "filter__text--invalid"
  const textInvalidFilter = document.querySelectorAll(".filter__text--invalid");

  function filter(arr, prop, value) {
    let result = [];
    let newFilterArr = [...arr];

    // Проходим по каждому элементу newFilterArr
    for (const item of newFilterArr) {
      const propValue = String(item[prop]).toLowerCase();
      const filterValue = value.toLowerCase();

      // Если значение свойства prop включает значение фильтра filterValue, добавляем элемент в результирующий массив result
      if (propValue.includes(filterValue)) {
        result.push(item);
      }
    }

    // Возвращаем отфильтрованный массив result
    return result;
  }

  // Функция renderFilter принимает массив студентов (arr) и обновляет список студентов на странице в соответствии с выбранными фильтрами.
  function renderFilter(arr) {
    // Очищаем содержимое элемента listAddStudents
    listAddStudents.innerHTML = "";

    // Создаем новый массив newArr, применяя функцию map к каждому элементу массива arr
    let newArr = arr.map(student => {
      const fio = student.name + student.surname + student.middlename;// Создаем переменную fio, объединяя имя, фамилию и отчество студента
      const yearEducationLast = Number(student.yearEducation) + 4;// Создаем переменную yearEducationLast, добавляя 4 к году образования студента
      return { ...student, fio, yearEducationLast }; // Создаем новый объект с объединенным свойством fio
    });

    // Фильтрация по факультету, если значение в фильтре filterFaculty не пустое
    if (filterFaculty.value.trim() !== "") newArr = filter(newArr, "faculty", filterFaculty.value.trim());
    // Фильтрация по фио, если значение в фильтре filterName не пустое
    if (filterName.value.trim() !== "") newArr = filter(newArr, "fio", filterName.value.trim());

    // Фильтрация по начальному году образования, если значение в фильтре filterYearEducationfirst не пустое
    if (filterYearEducationfirst.value !== "") {
      if (String(filterYearEducationfirst.value).length === 4) {
        newArr = filter(newArr, "yearEducation", filterYearEducationfirst.value);
        if (filterYearEducationfirst.value <= yearNow && Number(filterYearEducationfirst.value) >= 2000) {
          textErrorFilter[0].textContent = "Год введен правильно";
          textInvalidFilter[0].classList.add("has-success");
          textInvalidFilter[0].classList.remove("has-error");
        }
      } else {
        textErrorFilter[0].textContent = "Введите правильный год (с 2000г. по н.г.)";
        textInvalidFilter[0].classList.add("has-error");
        textInvalidFilter[0].classList.remove("has-success");
      }
    } else {
      textErrorFilter[0].textContent = "";
      textInvalidFilter[0].classList.remove("has-success");
      textInvalidFilter[0].classList.remove("has-error");
    }

    // Фильтрация по конечному году образования, если значение в фильтре filterYearEducationLast не пустое
    if (filterYearEducationLast.value !== "") {
      if (String(filterYearEducationLast.value).length === 4) {
        newArr = filter(newArr, "yearEducationLast", filterYearEducationLast.value);
        if (filterYearEducationLast.value <= yearNow + 4 && Number(filterYearEducationLast.value) >= 2004) {
          textErrorFilter[1].textContent = "Год введен правильно";
          textInvalidFilter[1].classList.add("has-success");
          textInvalidFilter[1].classList.remove("has-error");
        }
      } else {
        textErrorFilter[1].textContent = "Введите правильный год (с 2004г. по (н.г. + 4))";
        textInvalidFilter[1].classList.add("has-error");
        textInvalidFilter[1].classList.remove("has-success");
      }
    } else {
      textErrorFilter[1].textContent = "";
      textInvalidFilter[1].classList.remove("has-success");
      textInvalidFilter[1].classList.remove("has-error");
    }

    // Проверяем, если все значения фильтров пустые
    if (filterFaculty.value.trim() === "" && filterName.value.trim() === "" && filterYearEducationfirst.value === "" && filterYearEducationLast.value === "") {
      // Если все значения пустые, то отключаем кнопку filterBtnRemove
      filterBtnRemove.disabled = true;
    } else {
      // Если хотя бы одно значение не пустое, то включаем кнопку filterBtnRemove
      filterBtnRemove.disabled = false;
    }

    // Добавляем каждого студента из массива newArr в список listAddStudents
    newArr.forEach(student => {
      let studentItem = getStudentItem(student);

      // кнопка удаления студента обработчик события
      studentItem.btnDeleteStudent.addEventListener("click", function () {
        if (confirm("Вы уверены?")) {
          studentItem.item.remove();
          studentRemoveObj(arr, student);
        }
      });

      listAddStudents.append(studentItem.item);

      return studentItem;
    });

    return newArr;
  };

  // Обработчик события input для формы фильтрации
  filterForm.addEventListener('input', (e) => {
    renderFilter(studentsList);

    // Проверяем, если все значения фильтров пустые
    if (filterFaculty.value.trim() === "" && filterName.value.trim() === "" && filterYearEducationfirst.value === "" && filterYearEducationLast.value === "") {
      // Если все значения пустые, то включаем все кнопки сортировки
      sortBtn.forEach(btn => {
        btn.disabled = false;
      });
      sortBtnReset.disabled = false;

      // Отменяем действие по умолчанию
      e.preventDefault()
    } else {
      // Если хотя бы одно значение не пустое, то отключаем все кнопки сортировки
      sortBtn.forEach(btn => {
        btn.disabled = true;
      });
      sortBtnReset.disabled = true;
    }
  });

  // Обработчик события reset для формы фильтрации
  filterForm.addEventListener('reset', () => {
    // Удаляем классы has-error и has-success у элементов с сообщениями об ошибках
    textInvalidFilter.forEach(invalid => {
      invalid.classList.remove("has-error");
      invalid.classList.remove("has-success");
    })

    // Очищаем текст сообщений об ошибках
    textErrorFilter.forEach(error => {
      error.textContent = "";
    })

    // Отключаем кнопку filterBtnRemove
    filterBtnRemove.disabled = true;

    // Включаем все кнопки сортировки
    sortBtn.forEach(btn => {
      btn.disabled = false;
    })
    sortBtnReset.disabled = false;

    // Сбрасываем сортировку списка студентов
    sortReset(studentsList);
  });

  // Вызываем функцию renderFilter для отображения отфильтрованного списка студентов
  renderFilter(studentsList);
})();
