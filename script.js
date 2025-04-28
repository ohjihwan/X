const API_URL = 'http://127.0.0.1:8080';

// 로그인 함수
async function login() {
    const userid = document.getElementById("login-userid").value;
    const password = document.getElementById("login-password").value;

    const response = await fetch(`${API_URL}/auth/login`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ userid, password })
    });

    if (response.ok) {
        const data = await response.json();
        const token = data.token;

        // 로그인 성공 시 토큰을 로컬스토리지에 저장하고 포스트 작성 폼을 표시
        localStorage.setItem("token", token);
        document.getElementById("login-form").style.display = 'none';
        document.getElementById("post-form").style.display = 'block';
    } else {
        alert('로그인 실패');
    }
}

// 포스트 작성 함수
async function createPost() {
    const token = localStorage.getItem("token");
    const text = document.getElementById("post-text").value;

    const response = await fetch(`${API_URL}/posts/`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({
            text: text
        })
    });

    if (response.ok) {
        const data = await response.json();
        alert('포스트 작성 성공');
    } else {
        alert('포스트 작성 실패');
    }
}
