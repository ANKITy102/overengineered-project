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
exports.isLikedBlog = exports.getAllBlogsExceptUser = exports.deleteBlog = exports.getUserBlog = exports.getBlogById = exports.getAllBlogs = exports.dislikeBlog = exports.likeBlog = exports.updateBlog = exports.createBlog = void 0;
var asyncHandler = require("express-async-handler");
var client_1 = require("@prisma/client");
exports.createBlog = asyncHandler(function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var user, body, title, label, description, prisma, newBlog;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                user = req.user;
                body = req.body;
                title = body.title, label = body.label, description = body.description;
                if (!title || !label || !description) {
                    throw new Error("All fields are required.");
                }
                prisma = new client_1.PrismaClient();
                _a.label = 1;
            case 1:
                _a.trys.push([1, , 4, 6]);
                return [4 /*yield*/, prisma.blog.create({
                        data: {
                            title: title,
                            label: label,
                            Description: description,
                            userId: user.id
                        }
                    })];
            case 2:
                newBlog = _a.sent();
                return [4 /*yield*/, prisma.user.update({
                        where: { id: user.id },
                        data: { blogs: { connect: { id: newBlog.id } } }
                    })];
            case 3:
                _a.sent();
                // console.log(req.user);
                return [2 /*return*/, res.status(200).json(newBlog)];
            case 4: return [4 /*yield*/, prisma.$disconnect()];
            case 5:
                _a.sent();
                return [7 /*endfinally*/];
            case 6: return [2 /*return*/];
        }
    });
}); });
exports.updateBlog = asyncHandler(function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var user, body, blogId, title, label, description, prisma, existingBlog, updatedBlog;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                user = req.user;
                body = req.body;
                blogId = body.blogId, title = body.title, label = body.label, description = body.description;
                if (!blogId || !title || !label || !description) {
                    throw new Error("All fields are required.");
                }
                prisma = new client_1.PrismaClient();
                _a.label = 1;
            case 1:
                _a.trys.push([1, , 4, 6]);
                return [4 /*yield*/, prisma.blog.findFirst({
                        where: {
                            id: blogId,
                            userId: user.id
                        }
                    })];
            case 2:
                existingBlog = _a.sent();
                if (!existingBlog) {
                    throw new Error("Blog not found or you do not have permission to update it.");
                }
                return [4 /*yield*/, prisma.blog.update({
                        where: { id: blogId },
                        data: {
                            title: title,
                            label: label,
                            Description: description
                        }
                    })];
            case 3:
                updatedBlog = _a.sent();
                return [2 /*return*/, res.status(200).json({ updatedBlog: updatedBlog, status: "success" })];
            case 4: return [4 /*yield*/, prisma.$disconnect()];
            case 5:
                _a.sent();
                return [7 /*endfinally*/];
            case 6: return [2 /*return*/];
        }
    });
}); });
exports.likeBlog = asyncHandler(function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var user, body, blogId, prisma, existingBlog, existingLike, increase, likedBlog;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                user = req.user;
                body = req.body;
                blogId = body.blogId;
                if (!blogId) {
                    throw new Error("Blog ID is required.");
                }
                prisma = new client_1.PrismaClient();
                _a.label = 1;
            case 1:
                _a.trys.push([1, , 6, 8]);
                return [4 /*yield*/, prisma.blog.findFirst({
                        where: {
                            id: blogId
                        }
                    })];
            case 2:
                existingBlog = _a.sent();
                if (!existingBlog) {
                    throw new Error("Blog not found.");
                }
                return [4 /*yield*/, prisma.likedBlog.findFirst({
                        where: {
                            userId: user.id,
                            blogId: blogId
                        }
                    })];
            case 3:
                existingLike = _a.sent();
                if (existingLike) {
                    throw new Error("You have already liked this blog.");
                }
                return [4 /*yield*/, prisma.blog.update({
                        where: {
                            id: blogId
                        },
                        data: {
                            likes: {
                                increment: 1
                            }
                        }
                    })];
            case 4:
                increase = _a.sent();
                return [4 /*yield*/, prisma.likedBlog.create({
                        data: {
                            userId: user.id,
                            blogId: blogId
                        }
                    })];
            case 5:
                likedBlog = _a.sent();
                return [2 /*return*/, res.status(200).json({ message: "Blog liked successfully." })];
            case 6: return [4 /*yield*/, prisma.$disconnect()];
            case 7:
                _a.sent();
                return [7 /*endfinally*/];
            case 8: return [2 /*return*/];
        }
    });
}); });
exports.dislikeBlog = asyncHandler(function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var user, body, blogId, prisma, existingBlog, existingLike, decrement;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                user = req.user;
                body = req.body;
                blogId = body.blogId;
                if (!blogId) {
                    throw new Error("Blog ID is required.");
                }
                prisma = new client_1.PrismaClient();
                _a.label = 1;
            case 1:
                _a.trys.push([1, , 6, 8]);
                return [4 /*yield*/, prisma.blog.findFirst({
                        where: {
                            id: blogId
                        }
                    })];
            case 2:
                existingBlog = _a.sent();
                if (!existingBlog) {
                    throw new Error("Blog not found.");
                }
                return [4 /*yield*/, prisma.likedBlog.findFirst({
                        where: {
                            userId: user.id,
                            blogId: blogId
                        }
                    })];
            case 3:
                existingLike = _a.sent();
                if (!existingLike) {
                    throw new Error("You haven't liked this blog.");
                }
                return [4 /*yield*/, prisma.blog.update({
                        where: {
                            id: blogId
                        },
                        data: {
                            likes: {
                                decrement: 1
                            }
                        }
                    })];
            case 4:
                decrement = _a.sent();
                return [4 /*yield*/, prisma.likedBlog["delete"]({
                        where: {
                            id: existingLike.id
                        }
                    })];
            case 5:
                _a.sent();
                return [2 /*return*/, res.status(200).json({ message: "Like removed successfully." })];
            case 6: return [4 /*yield*/, prisma.$disconnect()];
            case 7:
                _a.sent();
                return [7 /*endfinally*/];
            case 8: return [2 /*return*/];
        }
    });
}); });
exports.getAllBlogs = asyncHandler(function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var prisma, blogs;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                prisma = new client_1.PrismaClient();
                _a.label = 1;
            case 1:
                _a.trys.push([1, , 3, 5]);
                return [4 /*yield*/, prisma.blog.findMany()];
            case 2:
                blogs = _a.sent();
                return [2 /*return*/, res.status(200).json({ blogs: blogs, message: "success" })];
            case 3: return [4 /*yield*/, prisma.$disconnect()];
            case 4:
                _a.sent();
                return [7 /*endfinally*/];
            case 5: return [2 /*return*/];
        }
    });
}); });
exports.getBlogById = asyncHandler(function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var blogId, prisma, blog;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                blogId = req.params.blogId;
                prisma = new client_1.PrismaClient();
                _a.label = 1;
            case 1:
                _a.trys.push([1, , 3, 5]);
                return [4 /*yield*/, prisma.blog.findUnique({
                        where: {
                            id: blogId
                        }
                    })];
            case 2:
                blog = _a.sent();
                if (!blog) {
                    throw new Error("Blog not found.");
                }
                return [2 /*return*/, res.status(200).json(blog)];
            case 3: return [4 /*yield*/, prisma.$disconnect()];
            case 4:
                _a.sent();
                return [7 /*endfinally*/];
            case 5: return [2 /*return*/];
        }
    });
}); });
exports.getUserBlog = asyncHandler(function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var userId, prisma, blog;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                userId = req.user.id;
                prisma = new client_1.PrismaClient();
                _a.label = 1;
            case 1:
                _a.trys.push([1, , 3, 5]);
                return [4 /*yield*/, prisma.blog.findMany({
                        where: {
                            userId: userId
                        }
                    })];
            case 2:
                blog = _a.sent();
                if (!blog) {
                    throw new Error("Blog not found.");
                }
                return [2 /*return*/, res.status(200).json({ blog: blog, message: "success" })];
            case 3: 
            // console.log("inside finaly statement ")
            return [4 /*yield*/, prisma.$disconnect()];
            case 4:
                // console.log("inside finaly statement ")
                _a.sent();
                return [7 /*endfinally*/];
            case 5: return [2 /*return*/];
        }
    });
}); });
exports.deleteBlog = asyncHandler(function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var user, blogId, prisma, existingBlog;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                user = req.user;
                blogId = req.params.blogId;
                prisma = new client_1.PrismaClient();
                _a.label = 1;
            case 1:
                _a.trys.push([1, , 5, 7]);
                if (!blogId) {
                    throw new Error("Invalid Request.");
                }
                // Check if the blog exists
                console.log(blogId, user.id);
                return [4 /*yield*/, prisma.blog.findFirst({
                        where: {
                            id: blogId,
                            userId: user.id
                        }
                    })];
            case 2:
                existingBlog = _a.sent();
                if (!existingBlog) {
                    throw new Error("Blog not found or you do not have permission to delete it.");
                }
                return [4 /*yield*/, prisma.likedBlog.deleteMany({
                        where: {
                            blogId: blogId
                        }
                    })];
            case 3:
                _a.sent();
                // Delete the blog
                return [4 /*yield*/, prisma.blog["delete"]({
                        where: {
                            id: blogId
                        }
                    })];
            case 4:
                // Delete the blog
                _a.sent();
                return [2 /*return*/, res.status(200).json({ message: "Blog deleted successfully." })];
            case 5: return [4 /*yield*/, prisma.$disconnect()];
            case 6:
                _a.sent();
                return [7 /*endfinally*/];
            case 7: return [2 /*return*/];
        }
    });
}); });
exports.getAllBlogsExceptUser = asyncHandler(function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var user, prisma, blogs;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                user = req.user;
                prisma = new client_1.PrismaClient();
                _a.label = 1;
            case 1:
                _a.trys.push([1, , 3, 5]);
                return [4 /*yield*/, prisma.blog.findMany({
                        where: {
                            NOT: {
                                userId: user.id
                            }
                        }
                    })];
            case 2:
                blogs = _a.sent();
                return [2 /*return*/, res.status(200).json({ blogs: blogs, message: "success" })];
            case 3: return [4 /*yield*/, prisma.$disconnect()];
            case 4:
                _a.sent();
                return [7 /*endfinally*/];
            case 5: return [2 /*return*/];
        }
    });
}); });
exports.isLikedBlog = asyncHandler(function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var user, blogId, prisma, isLiked;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                user = req.user;
                blogId = req.body.blogId;
                if (!blogId) {
                    throw new Error("Invalid Request. Blog not found.");
                }
                prisma = new client_1.PrismaClient();
                _a.label = 1;
            case 1:
                _a.trys.push([1, , 3, 5]);
                return [4 /*yield*/, prisma.likedBlog.findFirst({
                        where: {
                            userId: user.id,
                            blogId: blogId
                        }
                    })];
            case 2:
                isLiked = _a.sent();
                if (isLiked) {
                    res.status(200).json({ status: "success", isLiked: true });
                }
                else {
                    res.status(200).json({ status: "success", isLiked: false });
                }
                return [3 /*break*/, 5];
            case 3: return [4 /*yield*/, prisma.$disconnect()];
            case 4:
                _a.sent();
                return [7 /*endfinally*/];
            case 5: return [2 /*return*/];
        }
    });
}); });
