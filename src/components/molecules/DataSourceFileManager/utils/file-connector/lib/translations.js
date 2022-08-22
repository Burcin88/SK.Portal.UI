'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});


var storage = require('../../../../../../helpers/storage');

var storage2 = _interopRequireDefault(storage);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = getMessage;

function getMessage(locale, key, params) {

  var userSettings = storage2.storage.get("userSettings");
  var localization = userSettings.localization;
  var translations = {
    en: {
      uploading: localization["Uploading"] || "Uploading",
      uploadingItem: localization["UploadingOneItem"] || "UploadingOneItem",
      uploadingItems: localization["UploadingItems"] || "UploadingOneItems",
      upload: localization["Upload"] || "Upload",
      remove: localization["Remove"] || "Remove",
      download: localization["Download"] || "Download",
      rename: localization["Rename"] || "Rename",
      creating: localization["Creating"] || "Creating",
      creatingName: localization["CreatingName"] || "CreatingName",
      create: localization["Create"] || "Create",
      createFolder: localization["CreateFolder"] || "CreateFolder",
      zipping: localization["Zipping"] || "Zipping",
      zippingItem: localization["ZippingOneItem"] || "ZippingOneItem",
      zippingItems: localization["ZippingItems"] || "ZippingItems",
      items: localization["Items"] || "Items",
      item: localization["Item"] || "Item",
      cancel: localization["Cancel"] || "Cancel",
      confirm: localization["Confirm"] || "Confirm",
      folderName: localization["FolderName"] || "FolderName",
      files: localization["Files"] || "Files",
      fileExist: localization["FileOrFolderAlreadyexists"] || "FileOrFolderAlreadyexists",
      newName: localization["NewName"] || "NewName",
      emptyName: localization["NameIsRequired"] || "NameIsRequired",
      tooLongFolderName: localization["TooLongFolderName"] || "TooLongFolderName",
      folderNameNotAllowedCharacters: localization["NotAllowedCharacterFolderName"] || "NotAllowedCharacterFolderName",
      title: localization["Title"] || "Title",
      fileSize: localization["Size"] || "Size",
      lastModified: localization["LastModifiedTime"] || "LastModifiedTime",
      creationTime: localization["CreationTime"] || "CreationTime",
      reallyRemove: localization["AreYouSure"] || "AreYouSure",
      unableReadDir: localization["UnableToReadDirectory"] || "UnableToReadDirectory",
    },
  };


  var translationExists = translations[locale] && translations[locale][key];
  var translation = translationExists ? translations[locale][key] : translations['en'][key];
  if (!params) {
    return translation;
  }

  var re = /{\w+}/g;
  function replace(match) {
    var replacement = match.slice(1, -1);
    return params[replacement] ? params[replacement] : '';
  }

  return translation.replace(re, replace);
}