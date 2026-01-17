using System.Collections.Generic;
using TMPro;
using UnityEngine;
using UnityEngine.InputSystem;

public class TextManager : MonoBehaviour
{

    public TextMeshProUGUI textObj;
    Dictionary<int, string> texts = new Dictionary<int, string>{
    { 5, "Bonjour." },
    { 7, "Savez-vous pourquoi vous êtes ici ?" },
    { 9, "Ne vous attendez pas à ce que j'ai la réponse." },
    { 11, "Pour de vrai, je n'en ai pas la moindre idée."},
    { 13, "Je sais seulement que vous devriez arrêter d'avancer."},
    { 14, "C'est un conseil."},
    { 15, "J'insiste."},
    { 20, "Ce n'est pas un jeu, vous devriez m'écouter."},
    { 23, "Il est vrai que la patience est une vertue."},
    { 24, "Mais on dit surtout que la curiosité est un vilain défaut."},
    { 27, "Qu'est ce que vous pensez trouver au bout de ce couloir ?"},
    { 28, "Quoi que ce soit, ce ne sera pas la solution."},
    { 29, "Je vous l'assure."},
    { 30, "Ce ne sera pas non plus quelque chose de positif."},
    { 31, "Vous voyez bien qu'il n'y a pas de lumière."}
    };

    InputAction forward;
    private int clickCount;
    // Start is called once before the first execution of Update after the MonoBehaviour is created
    void Start()
    {
        forward = InputSystem.actions.FindAction("Navigate/Forward");
    }

    // Update is called once per frame
    void Update()
    {
        if (forward.triggered)
        {
            clickCount++;
            displayText();
        }
    }

    void displayText()
    {
        if (texts.ContainsKey(clickCount))
        {
           textObj.text = texts[clickCount];
        }
    }
}
