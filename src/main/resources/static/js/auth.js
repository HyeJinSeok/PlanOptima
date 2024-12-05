document.addEventListener("DOMContentLoaded", function () {
    const toggleLoginButton = document.getElementById("toggleLogin");
    const loginBanner = document.getElementById("loginBanner");
    const loginButton = document.getElementById("loginButton");
    const signupButton = document.getElementById("signupButton");
    const welcomeMessage = document.getElementById("welcomeMessage");
    const messageDiv = document.getElementById("message");
    const signupFields = document.getElementById("signup-fields");

    // 요소들이 제대로 로드되었는지 확인
    if (!toggleLoginButton || !loginBanner || !loginButton || !signupButton || !messageDiv || !welcomeMessage) {
        console.error("필수 요소가 로드되지 않았습니다.");
        return;
    }

    // 로그인 상태 확인 요청
    fetch('/auth/status')
        .then(response => response.json())
        .then(data => {
            if (data.loggedIn) {
                welcomeMessage.style.display = "block";
                welcomeMessage.classList.add("show");
                welcomeMessage.style.lineHeight = "2";
                welcomeMessage.innerHTML = `${data.name}님 환영합니다!<br>아래 항목을 기입하여 일정을 만들고<br>좌측의 다양한 메뉴를 활용해보세요`;
                toggleLoginButton.textContent = "로그아웃";
                loginButton.style.display = "none";
                signupButton.style.display = "none";

                // 일정 시간 후 웰컴 박스를 자동으로 숨기기
                setTimeout(() => {
                    welcomeMessage.classList.remove("show");
                }, 2800);
            } else {
                toggleLoginButton.textContent = "로그인";
            }
        })
        .catch(error => {
            console.error("오류 발생:", error);
            messageDiv.style.color = "red";
            messageDiv.innerHTML = `오류 발생: ${error.message}`;
        });

    // 로그인/로그아웃 버튼 클릭 이벤트 리스너
    toggleLoginButton.addEventListener("click", function () {
        if (toggleLoginButton.textContent === "로그아웃") {
            // 로그아웃 처리
            fetch('/auth/logout', { method: 'POST' })
                .then(() => {
                    welcomeMessage.classList.remove("show");
                    setTimeout(() => location.reload(), 500);
                })
                .catch(error => {
                    console.error("로그아웃 오류:", error);
                    messageDiv.style.color = "red";
                    messageDiv.innerHTML = `로그아웃 오류: ${error.message}`;
                });
        } else {
            loginBanner.classList.toggle("show");
        }
    });

    // 로그인 버튼 클릭 이벤트 리스너
    loginButton.addEventListener("click", function () {
        const formData = new FormData(document.getElementById("authForm"));
        fetch('/auth/login', {
            method: 'POST',
            body: formData
        })
            .then(response => response.json())
            .then(data => {
                if (data.success) {
                    welcomeMessage.classList.add("show");
                    welcomeMessage.style.display = "block";
                    welcomeMessage.style.lineHeight = "2";
                    welcomeMessage.innerHTML = `${data.message}님 환영합니다!<br>아래 항목을 기입하여 일정을 만들고<br>좌측의 다양한 메뉴를 활용해보세요`;

                    toggleLoginButton.textContent = "로그아웃";

                    loginBanner.style.transition = "none";
                    loginBanner.classList.remove("show");
                    setTimeout(() => loginBanner.style.transition = "", 50);

                    loginButton.style.display = "none";
                    signupButton.style.display = "none";

                    // 일정 시간 후 웰컴 박스를 자동으로 숨기기
                    setTimeout(() => {
                        welcomeMessage.classList.remove("show");
                    }, 2800);
                } else {
                    messageDiv.style.color = "red";
                    messageDiv.innerHTML = `로그인 실패: ${data.message}`;
                }
            })
            .catch(error => {
                console.error("로그인 오류:", error);
                messageDiv.style.color = "red";
                messageDiv.innerHTML = `로그인 오류: ${error.message}`;
            });
    });

    // **회원가입 버튼 클릭 이벤트 리스너 수정**
    signupButton.addEventListener("click", function () {
        // 회원가입 버튼을 클릭하면 '확인'과 '취소' 버튼을 생성
        signupFields.style.display = "block";  // '이름' 입력란을 보이게 함
        signupButton.style.display = "none";   // 기존 회원가입 버튼 숨김

        // 기존 로그인 버튼도 숨김
        loginButton.style.display = "none";

        // 확인 버튼 생성
        const confirmButton = document.createElement("button");
        confirmButton.textContent = "확인";
        confirmButton.id = "confirmButton";
        confirmButton.type = "button";

        // 취소 버튼 생성
        const cancelButton = document.createElement("button");
        cancelButton.textContent = "취소";
        cancelButton.id = "cancelButton";
        cancelButton.type = "button";

        // 버튼들을 버튼 컨테이너에 추가
        const buttonsContainer = document.querySelector(".buttons-container");
        buttonsContainer.appendChild(confirmButton);
        buttonsContainer.appendChild(cancelButton);

        // '확인' 버튼 클릭 시 로그인 처리
        confirmButton.addEventListener("click", function () {
            const formData = new FormData(document.getElementById("authForm"));
            fetch('/auth/signup', {
                method: 'POST',
                body: formData
            })
                .then(response => response.json())
                .then(data => {
                    if (data.success) {
                        // 성공 메시지 스타일 적용
                        messageDiv.style.color = "green";
                        messageDiv.innerHTML = "회원가입 성공! 로그인해주세요.";
                        // 회원가입 후 로그인 필드로 전환
                        document.getElementById('signup-fields').style.display = 'none';
                        document.getElementById('login-fields').style.display = 'block';
                        // 버튼들 삭제
                        confirmButton.remove();
                        cancelButton.remove();
                        signupButton.style.display = "block";  // 회원가입 버튼 다시 보이기
                        loginButton.style.display = "block";   // 로그인 버튼 다시 보이기
                    } else {
                        messageDiv.style.color = "red";
                        messageDiv.innerHTML = `회원가입 실패: ${data.message}`;
                    }
                })
                .catch(error => {
                    console.error("회원가입 오류:", error);
                    messageDiv.style.color = "red";
                    messageDiv.innerHTML = `회원가입 오류: ${error.message}`;
                });
        });

        // '취소' 버튼 클릭 시 회원가입 취소
        cancelButton.addEventListener("click", function () {
            document.getElementById('signup-fields').style.display = 'none';
            document.getElementById('login-fields').style.display = 'block';
            // 버튼들 삭제
            confirmButton.remove();
            cancelButton.remove();
            signupButton.style.display = "block";  // 회원가입 버튼 다시 보이기
            loginButton.style.display = "block";   // 로그인 버튼 다시 보이기
        });
    });
});