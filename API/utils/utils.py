#!/bin/env
from utils import *

def random_id(length):
    return ''.join(random.SystemRandom().choice(string.ascii_uppercase + string.ascii_lowercase + string.digits) for _ in range(length))