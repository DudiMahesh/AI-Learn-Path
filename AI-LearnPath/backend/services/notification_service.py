from models import db, Notification

def create_notification(user_id, title, message, type='info'):
    notif = Notification(user_id=user_id, title=title, message=message)
    db.session.add(notif)
    db.session.commit()

def get_user_notifications(user_id):
    return Notification.query.filter_by(user_id=user_id).all()

def mark_read(notification_id, user_id):
    notif = Notification.query.filter_by(id=notification_id, user_id=user_id).first()
    if notif:
        notif.is_read = True
        db.session.commit()
