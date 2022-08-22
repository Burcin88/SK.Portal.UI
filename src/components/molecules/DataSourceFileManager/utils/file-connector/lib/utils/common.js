"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.normalizeResource = normalizeResource;
function normalizeResource(resource) {
  if (resource) {
    return {
      ...resource
    };
  } else {
    return {};
  }
}