const express = require("express");

const AddImageId = require('../middleware/ImageId')
const { FOendPointAuth } = require('../middleware/EndpointAuth')
const { AppUserImageUploader } = require('../middleware/ImageUploader')
const { StandardLimiter, ChangePassLimiter } = require('../middleware/RateLimiter')

const FoAuthRoute = require('./FoAuth')
const AppUsersRoute = require('./AppUsers')
const RecordRoute = require('./Records')
const CategoriesRoute = require('./Categories')
const ShoppingListRoute = require('./ShoppingLists')
const BalanceRoute = require('./Balance')

const routes = {
    app_users: AppUsersRoute,
    records: RecordRoute,
    categories: CategoriesRoute,
    shopping_list: ShoppingListRoute,
    balance: BalanceRoute
}

module.exports = app => {
    app.use(express.json());

    const makeHandlerAwareOfAsyncError = (handler) => {
        return async (req, res, next) => {
            try {
                await handler(req, res);
            } catch (error) {
                next(error);
            }
        }
    }

    for (const [routeName, routeController] of Object.entries(routes)) {
        if (routeController.getAll) {
            app.get(`/api/${routeName}`, [StandardLimiter, FOendPointAuth], makeHandlerAwareOfAsyncError(routeController.getAll))
        }

        if (routeController.getByID) {
            app.get(`/api/${routeName}/:id`, [StandardLimiter, FOendPointAuth], makeHandlerAwareOfAsyncError(routeController.getByID))
        }

        if (routeController.create) {
            app.post(`/api/${routeName}`, [StandardLimiter, FOendPointAuth, AddImageId, AppUserImageUploader], makeHandlerAwareOfAsyncError(routeController.create))
        }

        if (routeController.update) {
            app.put(`/api/${routeName}/:id`, [StandardLimiter, FOendPointAuth], makeHandlerAwareOfAsyncError(routeController.update))
        }

        if (routeController.remove) {
            app.delete(`/api/${routeName}/:id`, FOendPointAuth, makeHandlerAwareOfAsyncError(routeController.remove))
        }
    }

    app.get('/health', (_, res) => {
        res.status(200).send('Server is up and running')
    })

    app.post('/api/app_users/auth', [], makeHandlerAwareOfAsyncError(FoAuthRoute.auth))

    app.post('/api/app_users/forgot-pass', [ChangePassLimiter], makeHandlerAwareOfAsyncError(routes.app_users.requestPassReset))
    app.post('/api/app_users/reset-pass', [ChangePassLimiter], makeHandlerAwareOfAsyncError(routes.app_users.resetPassword))

    app.post('/api/app_users/change-pass/:id', [ChangePassLimiter], makeHandlerAwareOfAsyncError(routes.app_users.changePassword))
    app.post('/api/app_users/remove-picture/:id', [StandardLimiter, FOendPointAuth], makeHandlerAwareOfAsyncError(routes.app_users.removePicture))
    app.post('/api/app_users/add-picture/:id', [StandardLimiter, FOendPointAuth, AddImageId, AppUserImageUploader], makeHandlerAwareOfAsyncError(routes.app_users.addPicture))

    app.post('/api/balance/get-open-balance', [StandardLimiter, FOendPointAuth], makeHandlerAwareOfAsyncError(routes.balance.getOpenBalance))

    app.get('/api/records-by-date', [StandardLimiter, FOendPointAuth], makeHandlerAwareOfAsyncError(routes.records.getByDate))

}