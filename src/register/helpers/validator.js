import * as $ from 'jquery';

export function checkUsername (username, cb) {
    $.post('http://localhost:3001/api/check-username', {
        username
    })
        .done((res) => {
            cb(res.result);
        })
        .fail(() => {
            cb(null);
        })
}

export function usernameValidator(value) {
    if (!value.match(/^[\w@$!%*#?&А-Яа-яЁёA-Za-z\s]*$/)) {
        return 'You can use latin letters, numbers and a lower underscore.';
    }
    if (value.length < 2) {
        return 'Too short username.';
    }
    if (value.length > 32) {
        return 'Too long username.';
    }
    return true;
}

export function passwordValidator (value) {
    if (!value.match(/^[\w@$!,.%*#?&]+$/)) {
        return 'You can use latin letters, numbers and symbols _@$!,.%*#?&';
    }
    if (value.length < 6) {
        return 'Too short password.';
    }
    if (value.length > 32) {
        return 'Too long password.';
    }
    return true;
}

export function emailValidator (value) {
    if (!value.match(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)) {
        return 'Incorrect email.';
    }
    return true;
}

