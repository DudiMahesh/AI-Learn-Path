from flask import jsonify

def success_response(data=None, message="Success", status_code=200):
    response = {"success": True, "message": message}
    if data is not None:
        response["data"] = data
    return jsonify(response), status_code

def error_response(message="Error", status_code=400):
    return jsonify({"success": False, "message": message}), status_code

def paginate_response(items, page, per_page, total):
    return success_response({
        "items": items,
        "pagination": {
            "page": page,
            "per_page": per_page,
            "total": total,
            "total_pages": (total + per_page - 1) // per_page
        }
    })
