'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _icons = require('./icons');
var _storage = require('../../../../../../helpers/storage');

exports.default = {
    locale: 'en',
    initialSortBy: 'name',
    initialSortDirection: 'ASC',
    dateTimePattern: _storage.storage.get("userSettings") ? _storage.storage.get("userSettings").longDateFormat : 'dd.MM.yyyy HH:mm',
    humanReadableSize: true,
    getIcon: _icons.getIcon
};