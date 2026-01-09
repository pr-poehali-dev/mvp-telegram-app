import json
import os
import urllib.request
import urllib.parse
from datetime import datetime

def handler(event: dict, context) -> dict:
    '''Отправка уведомлений о новых заявках в Telegram'''
    
    method = event.get('httpMethod', 'POST')
    
    if method == 'OPTIONS':
        return {
            'statusCode': 200,
            'headers': {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'POST, OPTIONS',
                'Access-Control-Allow-Headers': 'Content-Type'
            },
            'body': ''
        }
    
    if method != 'POST':
        return {
            'statusCode': 405,
            'headers': {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            'body': json.dumps({'error': 'Method not allowed'})
        }
    
    try:
        body = json.loads(event.get('body', '{}'))
        email = body.get('email', 'Не указан')
        user_id = body.get('userId', 'Не указан')
        amount = body.get('amount', 0)
        
        bot_token = os.environ.get('TELEGRAM_BOT_TOKEN', '8511097118:AAGuDK-PhqXlhZoJZGMXQ4e4Yw_R1S7ab8c')
        chat_id = os.environ.get('TELEGRAM_CHAT_ID', '1792863673')
        
        formatted_amount = f"{amount:,}".replace(',', ' ')
        current_time = datetime.now().strftime('%d.%m.%Y %H:%M:%S')
        
        message = (
            f"🔔 Новая заявка в Mkbroker!\n\n"
            f"📧 Email: {email}\n"
            f"🆔 ID: {user_id}\n"
            f"💰 Сумма: {formatted_amount} руб\n"
            f"📅 {current_time}"
        )
        
        telegram_url = f"https://api.telegram.org/bot{bot_token}/sendMessage"
        
        payload = {
            'chat_id': chat_id,
            'text': message
        }
        
        data = json.dumps(payload).encode('utf-8')
        
        req = urllib.request.Request(
            telegram_url,
            data=data,
            headers={'Content-Type': 'application/json'},
            method='POST'
        )
        
        with urllib.request.urlopen(req) as response:
            telegram_response = json.loads(response.read().decode('utf-8'))
            
            if telegram_response.get('ok'):
                return {
                    'statusCode': 200,
                    'headers': {
                        'Content-Type': 'application/json',
                        'Access-Control-Allow-Origin': '*'
                    },
                    'body': json.dumps({
                        'success': True,
                        'message': 'Уведомление отправлено в Telegram'
                    })
                }
            else:
                return {
                    'statusCode': 500,
                    'headers': {
                        'Content-Type': 'application/json',
                        'Access-Control-Allow-Origin': '*'
                    },
                    'body': json.dumps({
                        'success': False,
                        'error': 'Ошибка отправки в Telegram'
                    })
                }
    
    except urllib.error.HTTPError as e:
        error_body = e.read().decode('utf-8') if e.fp else str(e)
        return {
            'statusCode': 500,
            'headers': {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            'body': json.dumps({
                'success': False,
                'error': f'Telegram API Error: {e.code} - {error_body}'
            })
        }
    except Exception as e:
        return {
            'statusCode': 500,
            'headers': {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            'body': json.dumps({
                'success': False,
                'error': str(e)
            })
        }