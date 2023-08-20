"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
exports.deleteComment = exports.getCommentsByBlogId = exports.getComments = exports.addComment = void 0;
var asyncHandler = require("express-async-handler");
var client_1 = require("@prisma/client");
exports.addComment = asyncHandler(function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var user, body, description, blogId, prisma, newComment;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                user = req.user;
                body = req.body;
                description = body.description, blogId = body.blogId;
                // console.log(body)
                if (!description) {
                    throw new Error("Please add some comment.");
                }
                prisma = new client_1.PrismaClient();
                _a.label = 1;
            case 1:
                _a.trys.push([1, , 4, 6]);
                return [4 /*yield*/, prisma.comments.create({
                        data: {
                            description: description,
                            blogId: blogId,
                            userId: user.id,
                            name: user.username // Assuming userId corresponds to an existing User in your database
                        }
                    })];
            case 2:
                newComment = _a.sent();
                return [4 /*yield*/, prisma.user.update({
                        where: { id: user.id },
                        data: { Comments: { connect: { id: newComment.id } } }
                    })];
            case 3:
                _a.sent();
                return [2 /*return*/, res.status(200).json(newComment)];
            case 4: return [4 /*yield*/, prisma.$disconnect()];
            case 5:
                _a.sent();
                return [7 /*endfinally*/];
            case 6: return [2 /*return*/];
        }
    });
}); });
exports.getComments = asyncHandler(function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var prisma, comments;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                prisma = new client_1.PrismaClient();
                _a.label = 1;
            case 1:
                _a.trys.push([1, , 3, 5]);
                return [4 /*yield*/, prisma.comments.findMany()];
            case 2:
                comments = _a.sent();
                return [2 /*return*/, res.status(200).json(comments)];
            case 3: return [4 /*yield*/, prisma.$disconnect()];
            case 4:
                _a.sent();
                return [7 /*endfinally*/];
            case 5: return [2 /*return*/];
        }
    });
}); });
exports.getCommentsByBlogId = asyncHandler(function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var blogId, prisma, comments;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                blogId = req.body.blogId;
                prisma = new client_1.PrismaClient();
                _a.label = 1;
            case 1:
                _a.trys.push([1, , 3, 5]);
                return [4 /*yield*/, prisma.comments.findMany({
                        where: { blogId: blogId }
                    })];
            case 2:
                comments = _a.sent();
                return [2 /*return*/, res.status(200).json({ comments: comments, message: "success" })];
            case 3: return [4 /*yield*/, prisma.$disconnect()];
            case 4:
                _a.sent();
                return [7 /*endfinally*/];
            case 5: return [2 /*return*/];
        }
    });
}); });
exports.deleteComment = asyncHandler(function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var user, commentId, prisma, existingBlog;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                user = req.user;
                commentId = req.params.commentId;
                if (!commentId) {
                    throw new Error("Invalid Request.");
                }
                prisma = new client_1.PrismaClient();
                _a.label = 1;
            case 1:
                _a.trys.push([1, , 4, 6]);
                return [4 /*yield*/, prisma.comments.findFirst({
                        where: {
                            id: commentId,
                            userId: user.id
                        }
                    })];
            case 2:
                existingBlog = _a.sent();
                if (!existingBlog) {
                    throw new Error("Comment not found or you do not have permission to delete it.");
                }
                // Delete the blog
                return [4 /*yield*/, prisma.comments["delete"]({
                        where: {
                            id: commentId
                        }
                    })];
            case 3:
                // Delete the blog
                _a.sent();
                return [3 /*break*/, 6];
            case 4: return [4 /*yield*/, prisma.$disconnect()];
            case 5:
                _a.sent();
                return [7 /*endfinally*/];
            case 6: return [2 /*return*/, res.status(200).json({ message: "Comment deleted successfully." })];
        }
    });
}); });
