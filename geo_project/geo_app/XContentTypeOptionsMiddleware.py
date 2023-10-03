# middleware.py (you can place this in one of your Django apps or create a new app for custom middlewares)

class XContentTypeOptionsMiddleware:
    def __init__(self, get_response):
        self.get_response = get_response

    def __call__(self, request):
        response = self.get_response(request)
        response["X-Content-Type-Options"] = "nosniff"
        return response