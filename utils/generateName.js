
import momentTime from 'moment-timezone';

export const generateName = async () => {
    let file = ``
    let date = momentTime.tz(new Date(), "Asia/Dhaka").format()
    const filterDate = date.split('T')[0]

    function makeid(length) {
        var result = '';
        var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        var charactersLength = characters.length;
        for (var i = 0; i < length; i++) {
            result += characters.charAt(Math.floor(Math.random() * charactersLength));
        }
        return result;
    }

    return file = `${makeid(50)}${filterDate}`;

}

